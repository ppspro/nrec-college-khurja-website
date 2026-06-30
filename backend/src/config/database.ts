import mongoose from 'mongoose';
import logger from '../utils/logger';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nrec_college';

    mongoose.connection.on('connected', () => {
      logger.info('MongoDB connected', { host: mongoose.connection.host });
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error', { error: err.message });
    });

    await mongoose.connect(mongoURI, {
      // Log slow queries (>100ms) to the structured logger
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error) {
    logger.error('Failed to connect to MongoDB – exiting', {
      error: (error as Error).message,
    });
    process.exit(1);
  }
};

export default connectDB;
