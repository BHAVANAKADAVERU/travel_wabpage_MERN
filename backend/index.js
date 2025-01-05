import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';
import tourGuideRoutes from './routes/tourGuides.js';
import newsletterSubscriberRoutes from './routes/newsletterSubscribers.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true, // Allow cookies to be sent with requests
};

// DB connectivity
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB database connected');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
    }
};

// Middleware setup
app.use(express.json());
app.use(cors(corsOptions)); // Only use this line for CORS configuration
app.use(cookieParser());


// Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/book', bookingRoute);
app.use('/api/v1/tour-guides', tourGuideRoutes);
app.use('/api/v1/newsletter-subscribers', newsletterSubscriberRoutes);

// Server start
app.listen(port, () => {
    connect();
    console.log(`Server is running on port ${port}`);
});
