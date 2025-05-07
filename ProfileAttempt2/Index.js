import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./Config/Database.js";
import errorHandler from './Middleware/ErrorHandler.js';
import ProfileRouter from "./Routes/UserProfileRoutes.js";

dotenv.config();

await connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use(cors());
app.use('/User/Profile', ProfileRouter);
app.get('/', (req, res) => {
    res.send('Creator Dashboard API is running...');
});

app.use(errorHandler); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});