import mongoose from 'mongoose';

const TourGuideSchema = new mongoose.Schema({
    guideId: { type: String, required: true, unique: true }, // Unique identifier for the guide
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    toursAssigned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tour' }], // Array of assigned tour IDs
    bio: { type: String },
    contactInfo: { type: String, required: true },
    availability: [
        {
            date: { type: Date },
            timeSlots: [{ type: String }] // E.g., ['10:00 AM - 12:00 PM', '2:00 PM - 4:00 PM']
        }
    ]
});

export default mongoose.model('TourGuide', TourGuideSchema);
