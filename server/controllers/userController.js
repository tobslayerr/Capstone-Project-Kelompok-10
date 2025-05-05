import User from '../models/User.js';
import { Purchase } from '../models/Purchase.js';
import Stripe from 'stripe';
import Course from '../models/Course.js';

// get user data
export const getUserData = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: 'User Not Found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// users enrolled courses with lecture links
export const userEnrolledCourses = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const userData = await User.findById(userId).populate('enrolledCourses');

    res.json({ success: true, enrolledCourses: userData.enrolledCourses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// purchase course or event
export const purchaseCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const { origin } = req.headers;
    const userId = req.auth.userId;

    const userData = await User.findById(userId);
    const courseData = await Course.findById(courseId);

    if (!userData || !courseData) {
      return res.json({ success: false, message: 'Data Not Found' });
    }

    // Hitung harga setelah diskon, pastikan berupa angka
    const rawAmount = courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100;
    const amount = Math.round(rawAmount * 100) / 100; // 2 angka di belakang koma

    if (amount < 0.5) {
      return res.json({ success: false, message: 'Course price too low to process payment.' });
    }

    const purchaseData = {
      courseId: courseData._id,
      userId,
      amount: amount,
    };

    const newPurchase = await Purchase.create(purchaseData);

    // STRIPE GATEWAY INITIALIZE
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    const currency = process.env.CURRENCY.toLowerCase();

    // Creating line items for Stripe
    const line_items = [
      {
        price_data: {
          currency,
          product_data: {
            name: courseData.courseTitle,
          },
          unit_amount: Math.round(amount * 100), // Convert ke cents
        },
        quantity: 1,
      },
    ];

    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/loading/my-enrollments`,
      cancel_url: `${origin}/`,
      line_items: line_items,
      mode: 'payment',
      metadata: {
        purchaseId: newPurchase._id.toString(),
      },
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// export const purchaseCourse = async (req, res) => {
//   try {
//     const { courseId } = req.body;
//     const { origin } = req.headers;
//     const userId = req.auth.userId;
//     const userData = await User.findById(userId);
//     const courseData = await Course.findById(courseId);

//     if (!userData || !courseData) {
//       return res.json({ success: false, message: 'Data Not Found' });
//     }

//     const purchaseData = {
//       courseId: courseData._id,
//       userId,
//       amount: (courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100).toFixed(2),
//     };

//     const newPurchase = await Purchase.create(purchaseData);

//     // STRIPE GATEAWAY INITIALIZE
//     const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

//     const currency = process.env.CURRENCY.toLowerCase();

//     // creating line items to for stripe
//     const line_items = [
//       {
//         price_data: {
//           currency,
//           product_data: {
//             name: courseData.courseTitle,
//           },
//           unit_amount: Math.floor(newPurchase.amount) * 100,
//         },
//         quantity: 1,
//       },
//     ];

//     const session = await stripeInstance.checkout.sessions.create({
//       success_url: `${origin}/loading/my-enrollments`,
//       cancel_url: `${origin}/`,
//       line_items: line_items,
//       mode: 'payment',
//       metadata: {
//         purchaseId: newPurchase._id.toString(),
//       },
//     });

//     res.json({ succes: true, session_url: session.url });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// add user ratings to event/course
export const addUserRating = async (req, res) => {
  const userId = req.auth.userId;
  const { courseId, rating } = req.body;

  if (!courseId || !userId || !rating || rating < 1 || rating > 5) {
    return res.json({ success: false, message: 'Invalid Details' });
  }

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.json({ success: false, message: 'Course not found.' });
    }

    const user = await User.findById(userId);

    if (!user || !user.enrolledCourses.includes(courseId)) {
      return res.json({ success: false, message: 'User has not purchased this course.' });
    }

    const existingRatingIndex = course.courseRatings.findIndex((r) => r.userId === userId);

    if (existingRatingIndex > -1) {
      course.courseRatings[existingRatingIndex].rating = rating;
    } else {
      course.courseRatings.push({ userId, rating });
    }

    await course.save();

    return res.json({ success: true, message: 'Rating Added' });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
