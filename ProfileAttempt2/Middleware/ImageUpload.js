import multer from "multer";
import { cloudinary } from "../Config/Cloudinary.js";

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only JPG, JPEG, and PNG is allowed"), false);
  }
  cb(null, true);
};

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter,
});

const uploadToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "profile_images",
        resource_type: "image",
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
    stream.end(fileBuffer); 
  });
};

function uploadSingleImage(imageType) {
  return [
    upload.single(imageType),
    async (req, res, next) => {
      try {
        if (!req.file) return next();

        const result = await uploadToCloudinary(req.file.buffer);

        req.file.cloudinaryUrl = result.secure_url;
        next();
      } catch (error) {
        next(error);
      }
    },
  ];
}

export { uploadSingleImage };
