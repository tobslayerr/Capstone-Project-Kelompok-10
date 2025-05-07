import { clerkClient } from '@clerk/express';

// Middleware untuk validasi apakah pengguna sudah login
export const authMiddleware = async (req, res, next) => {
  try {
    const userId = req.auth.userId; // Ini menggunakan Clerk untuk mendapatkan userId
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Not Authenticated' });
    }

    req.userId = userId; // Menyimpan userId dalam request untuk digunakan di controller
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// middleware (protect educator routes)
export const protectEducator = async (req, res, next) => {
  try {
    const userId = req.auth?.userId;

    if (!userId) {
      console.warn('🔒 Tidak ada userId di req.auth. Mungkin Clerk Middleware belum dijalankan.');
      return res.status(401).json({ success: false, message: 'Unauthorized - Missing user ID' });
    }

    const response = await clerkClient.users.getUser(userId);
    const role = response.publicMetadata?.role;

    if (role !== 'educator') {
      console.warn(`🔒 Akses ditolak untuk userId: ${userId}. Role ditemukan: ${role}`);
      return res.status(403).json({ success: false, message: 'Unauthorized Access - Educator only' });
    }

    // Lolos validasi
    next();
  } catch (error) {
    console.error('❌ Error di protectEducator:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
