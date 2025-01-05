import TourGuide from '../models/TourGuide.js';

export const createTourGuide = async (req, res) => {
    try {
        const newGuide = new TourGuide(req.body);
        const savedGuide = await newGuide.save();
        res.status(201).json({ success: true, message: 'Guide created successfully', data: savedGuide });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to create guide', error: err.message });
    }
};

export const getAllTourGuides = async (req, res) => {
    try {
        const guides = await TourGuide.find().populate('toursAssigned');
        res.status(200).json({ success: true, data: guides });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch guides', error: err.message });
    }
};

export const updateTourGuide = async (req, res) => {
    try {
        const updatedGuide = await TourGuide.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGuide) return res.status(404).json({ success: false, message: 'Guide not found' });
        res.status(200).json({ success: true, message: 'Guide updated successfully', data: updatedGuide });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update guide', error: err.message });
    }
};

export const deleteTourGuide = async (req, res) => {
    try {
        const deletedGuide = await TourGuide.findByIdAndDelete(req.params.id);
        if (!deletedGuide) return res.status(404).json({ success: false, message: 'Guide not found' });
        res.status(200).json({ success: true, message: 'Guide deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete guide', error: err.message });
    }
};
