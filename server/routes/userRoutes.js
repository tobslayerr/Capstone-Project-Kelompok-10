import express from 'express';
import { addUserRating, getUserData, purchaseCourse, userEnrolledCourses, enrollFreeCourse } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/enroll', authMiddleware, enrollFreeCourse);

userRouter.get('/data', getUserData);
userRouter.get('/enrolled-courses', userEnrolledCourses);
userRouter.post('/purchase', purchaseCourse);

userRouter.post('/add-rating', addUserRating);

export default userRouter;
