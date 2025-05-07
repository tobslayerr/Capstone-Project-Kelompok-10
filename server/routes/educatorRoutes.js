import express from 'express';
import {
  addCourse,
  educatorDashboardData,
  getEducatorCourses,
  getEnrolledStudentsData,
  updateRoleToEducator,
  deleteCourse,
  updateCourse,
  getCourseById, // ✔️ Tambahkan di sini
} from '../controllers/educatorController.js';
import upload from '../configs/multer.js'; // Pastikan import upload sudah benar
import { protectEducator } from '../middlewares/authMiddleware.js';
import EducatorApplication from '../models/EducatorApplication.js';
import verifyToken from '../middlewares/verifyToken.js'; // ✔️ tanpa curly braces
import { clerkClient } from '@clerk/clerk-sdk-node';

// Menghapus penggunaan uploadDest, cukup pakai upload yang sudah diimport dari multer.js
const educatorRouter = express.Router();

// Routes
educatorRouter.get('/update-role', updateRoleToEducator);
educatorRouter.post('/add-course', upload.single('image'), protectEducator, addCourse);
educatorRouter.get('/courses', protectEducator, getEducatorCourses);
educatorRouter.get('/dashboard', verifyToken, protectEducator, educatorDashboardData);
educatorRouter.get('/enrolled-students', protectEducator, getEnrolledStudentsData);

educatorRouter.get('/courses/:id', protectEducator, getCourseById); // ✔️ Route GET by ID
educatorRouter.delete('/courses/:id', protectEducator, deleteCourse);

// Hapus satu route PUT yang redundant
educatorRouter.put('/courses/:id', upload.single('image'), protectEducator, updateCourse); // ✔️ Gabungkan middleware

// Route untuk submit educator application
educatorRouter.post(
  '/apply',
  upload.fields([
    { name: 'ktp', maxCount: 1 },
    { name: 'certificate', maxCount: 1 },
  ]),
  async (req, res) => {
    console.log('FILES:', req.files);
    console.log('BODY:', req.body);
    try {
      const { fullName, phone, email, experience, userId } = req.body;
      const ktp = req.files.ktp?.[0]; // Menangani KTP
      const certificate = req.files.certificate?.[0]; // Menangani Sertifikat

      // Validasi file KTP wajib
      if (!ktp) {
        return res.status(400).json({ message: 'KTP wajib diunggah.' });
      }

      const ktpUrl = '/uploads/' + ktp.filename; // URL untuk file KTP
      const certificateUrl = certificate ? '/uploads/' + certificate.filename : ''; // URL untuk file Sertifikat jika ada

      // Membuat instance EducatorApplication
      const application = new EducatorApplication({
        userId,
        fullName,
        phone,
        email,
        experience,
        ktpUrl,
        certificateUrl,
      });

      // Menyimpan aplikasi ke database
      await application.save();
      res.json({ message: 'Formulir berhasil dikirim!' });
    } catch (err) {
      console.error('SERVER ERROR:', err);
      res.status(500).json({ message: 'Gagal mengirim formulir.' });
    }
  }
);

// Ambil aplikasi dengan status pending
educatorRouter.get('/pending', async (req, res) => {
  try {
    const applications = await EducatorApplication.find({ status: 'pending' });
    res.status(200).json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update status aplikasi menjadi 'approved'
educatorRouter.put('/approve/:id', async (req, res) => {
  try {
    // 1. Update status aplikasi menjadi approved
    const application = await EducatorApplication.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });

    if (!application) {
      return res.status(404).json({ success: false, message: 'Aplikasi tidak ditemukan.' });
    }

    // 2. Update Clerk publicMetadata (pastikan userId disimpan saat apply)
    await clerkClient.users.updateUserMetadata(application.userId, {
      publicMetadata: {
        role: 'educator',
      },
    });

    res.status(200).json({ success: true, message: 'Aplikasi disetujui & role diperbarui', application });
  } catch (error) {
    console.error('ERROR UPDATE CLERK:', error);
    res.status(500).json({ success: false, message: 'Gagal menyetujui aplikasi atau update Clerk metadata' });
  }
});

educatorRouter.get('/status', verifyToken, async (req, res) => {
  try {
    const educator = await EducatorApplication.findOne({ userId: req.userId });
    if (!educator) {
      return res.json({ success: true, status: null });
    }
    return res.json({ success: true, status: educator.status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default educatorRouter;
