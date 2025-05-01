import express from 'express';
import { addUserRating, getUserData, purchaseCourse, userEnrolledCourses } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/data', getUserData);
userRouter.get('/enrolled-courses', userEnrolledCourses);
userRouter.post('/purchase', purchaseCourse);

userRouter.post('/add-rating', addUserRating);

export default userRouter;
