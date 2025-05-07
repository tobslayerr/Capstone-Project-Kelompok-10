import express from 'express';
import { uploadSingleImage } from '../Middleware/ImageUpload.js';
import { createProfile, seeProfile, updateProfile, deleteProfile } from '../Controller/UserProfileController.js';


const ProfileRouter = express.Router();

ProfileRouter.post('/', uploadSingleImage('ProfileIMG'), createProfile);
ProfileRouter.get('/:id', seeProfile);
ProfileRouter.put('/:id', uploadSingleImage('ProfileIMG'), updateProfile);
ProfileRouter.delete('/:id', deleteProfile);

export default ProfileRouter;