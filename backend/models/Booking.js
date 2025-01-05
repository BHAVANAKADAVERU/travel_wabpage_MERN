import mongoose from "mongoose";

// Update the booking schema to store a reference to the Tour model
const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    tourId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Tour", // Reference to the Tour model
      required: true
    },
    fullName: {
      type: String,
      required: true,
    },
    guestSize: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    bookAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
