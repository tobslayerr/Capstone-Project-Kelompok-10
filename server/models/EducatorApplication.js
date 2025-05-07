import mongoose from 'mongoose';

const EducatorApplicationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  fullName: String,
  phone: String,
  email: String,
  experience: String,
  ktpUrl: String,
  certificateUrl: String,
  status: { type: String, default: 'pending' }, // pending | approved | rejected
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.model('EducatorApplication', EducatorApplicationSchema);
