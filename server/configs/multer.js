import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Menentukan folder penyimpanan untuk file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Pastikan folder uploads ada
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Menambahkan timestamp untuk mencegah nama file duplikat
  },
});

const upload = multer({ storage });

export default upload;
