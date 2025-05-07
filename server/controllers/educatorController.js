import { clerkClient } from '@clerk/express';
import Course from '../models/Course.js';
import { v2 as cloudinary } from 'cloudinary';
import { Purchase } from '../models/Purchase.js';
import User from '../models/User.js';
import EducatorApplication from '../models/EducatorApplication.js';

// update role to educator
export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: 'educator',
      },
    });

    res.json({ success: true, message: 'You can publish a event now' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const approveEducatorApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    // Cari aplikasinya
    const application = await EducatorApplication.findById(applicationId);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    // Update metadata di Clerk
    await clerkClient.users.updateUserMetadata(application.userId, {
      publicMetadata: {
        role: 'educator',
      },
    });

    // Tandai aplikasi sebagai disetujui di database lokal kamu (opsional)
    application.status = 'approved';
    await application.save();

    res.json({ success: true, message: 'Application approved and role updated' });
  } catch (error) {
    console.error('❌ Error approving application:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// add new course
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;
    const educatorId = req.auth.userId;

    if (!imageFile) {
      return res.json({ success: false, message: 'Thumbnail Not Attached' });
    }

    const parsedCourseData = await JSON.parse(courseData);
    parsedCourseData.educator = educatorId;
    const newCourse = await Course.create(parsedCourseData);
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    newCourse.courseThumbnail = imageUpload.secure_url;
    await newCourse.save();

    res.json({ success: true, message: 'Event Added' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// delete courses
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (course.educator.toString() !== req.auth.userId) {
      return res.status(403).json({ success: false, message: 'You are not authorized to delete this course' });
    }

    await course.deleteOne();

    res.status(200).json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// update course
export const updateCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const { id } = req.params;
    const imageFile = req.file;
    const educatorId = req.auth.userId;

    // Pastikan courseData ada
    if (!courseData) {
      return res.status(400).json({ success: false, message: 'Course data is missing' });
    }

    // JSON.parse hanya jika courseData ada
    const parsedCourseData = JSON.parse(courseData);
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Pastikan hanya educator yang sesuai yang bisa mengubah course
    if (course.educator.toString() !== educatorId) {
      return res.status(403).json({ success: false, message: 'You are not authorized to update this course' });
    }

    // Update fields dengan data baru
    course.courseTitle = parsedCourseData.courseTitle || course.courseTitle;
    course.coursePrice = parsedCourseData.coursePrice || course.coursePrice;
    course.discount = parsedCourseData.discount || course.discount;
    course.description = parsedCourseData.description || course.description;

    // Upload gambar jika ada
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path);
      course.courseThumbnail = imageUpload.secure_url;
    }

    // Simpan perubahan
    await course.save();
    res.json({ success: true, message: 'Course updated successfully' });
  } catch (error) {
    // Tangani error dengan pesan yang jelas
    res.status(500).json({ success: false, message: error.message });
  }
};

// Ambil satu course berdasarkan ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.json({ success: true, course });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// get educator courses
export const getEducatorCourses = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// get educator dashboard data (Total earning, enrolled students, no. of courses)
export const educatorDashboardData = async (req, res) => {
  try {
    const educator = req.auth.userId;

    // Cari semua course yang dibuat oleh educator ini
    const courses = await Course.find({ educator });
    const totalCourses = courses.length;

    // Ambil semua ID course untuk keperluan pencarian purchase
    const courseIds = courses.map((course) => course._id);

    // Hitung total earnings dari semua purchase yang statusnya 'completed'
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: 'completed',
    });

    const totalEarnings = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);

    // Kumpulkan data enrolled students
    const enrolledStudentsData = [];
    for (const course of courses) {
      const students = await User.find(
        {
          _id: { $in: course.enrolledStudents },
        },
        'name imageUrl' // hanya ambil field name dan imageUrl
      );

      students.forEach((student) => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student,
        });
      });
    }

    // Kirim response sukses
    res.json({
      success: true,
      dashboardData: {
        totalEarnings,
        enrolledStudentsData,
        totalCourses,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// get enrolled students data with purchase data
export const getEnrolledStudentsData = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    const courseIds = courses.map((course) => course._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: 'completed',
    })
      .populate('userId', 'name imageUrl')
      .populate('courseId', 'courseTitle');

    const enrolledStudents = purchases.map((purchase) => ({
      student: purchase.userId,
      courseTitle: purchase.courseId.courseTitle,
      purchaseDate: purchase.createdAt,
    }));

    res.json({ success: true, enrolledStudents });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
