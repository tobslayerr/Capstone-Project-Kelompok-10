import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './configs/cloudinary.js';
import courseRouter from './routes/courseRoute.js';
import userRouter from './routes/userRoutes.js';
import upload from './configs/multer.js'; // Impor multer dari multer.js

// inisialisasi express
const app = express();

// connect to database
await connectDB();
await connectCloudinary();

// middleware
app.use(cors());
app.use(clerkMiddleware());

// routes
app.get('/', (req, res) => res.send('API Working'));
app.post('/clerk', express.json(), clerkWebhooks);
app.use('/api/educator', educatorRouter);
app.use('/api/course', express.json(), courseRouter);
app.use('/api/user', express.json(), userRouter);
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

// Tambahkan route untuk update course dengan multer middleware
app.put('/api/educator/courses/:id', upload.single('image'), educatorRouter); // Menggunakan upload.single di sini

app.use('/uploads', express.static('uploads'));

// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
