import mongoose from 'mongoose';

// connecto to mongodb
const connectDB = async () => {
  mongoose.connection.on('connected', () => console.log('Database Connected'));

  await mongoose.connect(`${process.env.MONGODB_URL}/SIEvent`);
};

export default connectDB;
