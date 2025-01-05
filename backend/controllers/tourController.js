import Tour from '../models/Tour.js';
import User from '../models/User.js'; // Assuming you have the User model
import mongoose from 'mongoose';

// Allowed categories for tours
const allowedCategories = ["Beach", "Adventure", "Cultural", "City", "Nature"];

// Create new tour
export const createTour = async(req, res)=>{
    const { category } = req.body;

    // Validate category
    if (!allowedCategories.includes(category)) {
        return res.status(400).json({
            success: false,
            message: `Invalid category. Allowed categories are: ${allowedCategories.join(", ")}`,
        });
    }

    const newTour = new Tour(req.body);

    try {
        const savedTour = await newTour.save();

        res.status(200).json({
            success: true,
            message: 'Successfully created',
            data: savedTour,
        });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to create. Try again' });
    }
};

// Update tour
export const updateTour = async (req, res) => {
    const id = req.params.id;
    const { category } = req.body;

    // Validate category if provided
    if (category && !allowedCategories.includes(category)) {
        return res.status(400).json({
            success: false,
            message: `Invalid category. Allowed categories are: ${allowedCategories.join(", ")}`,
        });
    }

    try {
        const updatedTour = await Tour.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Successfully updated',
            data: updatedTour,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update',
        });
    }
};

// Get tours by category
export const getToursByCategory = async (req, res) => {
    const { category } = req.query;

    if (!allowedCategories.includes(category)) {
        return res.status(400).json({
            success: false,
            message: `Invalid category. Allowed categories are: ${allowedCategories.join(", ")}`,
        });
    }

    try {
        const tours = await Tour.find({ category }).populate('reviews');

        res.status(200).json({
            success: true,
            message: 'Successfully found tours',
            data: tours,
        });

    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'No tours found for the given category',
        });
    }
};

// Delete tour
export const deleteTour = async(req, res) => {
    const id = req.params.id;

    try {
        await Tour.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Successfully deleted',
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete',
        });
    }
};

// Get single tour
export const getSingleTour = async(req, res)=>{
    const id = req.params.id;

    try {
        const tour = await Tour.findById(id).populate('reviews');

        res.status(200).json({
            success: true,
            message: 'Successfully found tour',
            data: tour,
        });

    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Tour not found',
        });
    }
};

// Get all tours with pagination
export const getAllTours = async (req, res) => {
    const page = parseInt(req.query.page) || 0; // Default to page 0

    try {
        const tours = await Tour.find({}).populate('reviews')
            .skip(page * 8).limit(8);

        res.status(200).json({
            success: true,
            count: tours.length,
            message: 'Successfully fetched all tours',
            data: tours
        });

    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'No tours found',
        });
    }
};

// Search tours based on criteria
export const getTourBySearch = async (req, res) => {
    const { city, distance, maxGroupSize, priceRange, tourType } = req.query;
    let filter = {};

    // Location - city filter (case-insensitive)
    if (city) {
        filter.city = new RegExp(city, 'i');
    }

    // Distance filter (greater than or equal to specified distance)
    if (distance) {
        const distanceInt = parseInt(distance);
        if (!isNaN(distanceInt)) {
            filter.distance = { $gte: distanceInt };
        }
    }

    // Max Group Size filter
    if (maxGroupSize) {
        const maxGroupSizeInt = parseInt(maxGroupSize);
        if (!isNaN(maxGroupSizeInt)) {
            filter.maxGroupSize = { $gte: maxGroupSizeInt };
        }
    }

    // Price Range filter (e.g., "$0 - $1000")
    if (priceRange) {
        const [minPrice, maxPrice] = priceRange.split('-').map(price => parseInt(price.replace('$', '').trim()));
        if (!isNaN(minPrice) && !isNaN(maxPrice)) {
            filter.price = { $gte: minPrice, $lte: maxPrice };
        }
    }

    // Tour Type filter
    if (tourType && allowedCategories.includes(tourType)) {
        filter.category = tourType;
    }

    try {
        const tours = await Tour.find(filter).populate('reviews');

        if (tours.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Successfully found tours',
                data: tours,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'No results found for your search criteria',
                data: tours,
            });
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error occurred while searching for tours',
            error: err.message,
        });
    }
};

// Get featured tours
export const getFeaturedTours = async (req, res) => {
    try {
        const tours = await Tour.find({ featured: true }).populate('reviews').limit(8);

        res.status(200).json({
            success: true,
            message: 'Successfully fetched featured tours',
            data: tours,
        });

    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'No featured tours found',
        });
    }
};

// Get total tour count
export const getTourCount = async (req, res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount();

        res.status(200).json({
            success: true,
            data: tourCount,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch tour count',
        });
    }
};

// Book a tour (Requires user authentication)
export const bookTour = async (req, res) => {
    const { tourId } = req.body;
    const { userId } = req.user; // Assuming you use authentication middleware

    if (!mongoose.Types.ObjectId.isValid(tourId)) {
        return res.status(400).json({ success: false, message: 'Invalid tour ID' });
    }

    try {
        // Find the tour by ID
        const tour = await Tour.findById(tourId);
        if (!tour) {
            return res.status(404).json({ success: false, message: 'Tour not found' });
        }

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the user already booked this tour
        if (user.bookedTours.includes(tourId)) {
            return res.status(400).json({ success: false, message: 'You have already booked this tour' });
        }

        // Book the tour for the user
        user.bookedTours.push(tourId);
        await user.save();

        // Optionally, update the tour's bookedBy array
        tour.bookedBy.push(userId);
        await tour.save();

        res.status(200).json({
            success: true,
            message: 'Tour booked successfully',
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to book the tour',
        });
    }
};

// Get all tours booked by the user
export const getUserBookedTours = async (req, res) => {
    const { userId } = req.user; // Assuming userId is attached to the request

    try {
        // Find the user and populate the bookedTours field
        const user = await User.findById(userId).populate('bookedTours');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Successfully fetched booked tours',
            data: user.bookedTours,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch booked tours',
        });
    }
};
