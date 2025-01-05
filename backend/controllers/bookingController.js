import Booking from "../models/Booking.js";

// Create a new booking
export const createBooking = async (req, res) => {
  const { userId, tourName } = req.body;

  try {
    // Check if the user already booked this tour
    const existingBooking = await Booking.findOne({ userId, tourName });
    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "You have already booked this tour.",
      });
    }

    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();

    res.status(200).json({
      success: true,
      message: "Your tour has been booked successfully.",
      data: savedBooking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error. Booking could not be created.",
    });
  }
};

// Get a single booking
export const getBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking found.",
      data: booking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error. Could not fetch booking.",
    });
  }
};

// Get all bookings
export const getAllBooking = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({
      success: true,
      message: "All bookings retrieved successfully.",
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error. Could not fetch bookings.",
    });
  }
};

// Update a booking
export const updateBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking updated successfully.",
      data: updatedBooking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error. Could not update booking.",
    });
  }
};

// Get all bookings for a specific user
  // Import the Booking model

// Get all bookings for a specific user
export const getUserBookings = async (req, res) => {
  const { userId } = req.params; // Get the userId from the route params

  try {
    // Find all bookings for the specified user, and populate the tourId field with the associated Tour data
    const bookings = await Booking.find({ userId: userId }).populate("tourId");

    if (bookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No bookings found for this user.",
      });
    }

    // Return the bookings if found
    res.status(200).json({
      success: true,
      message: "User bookings retrieved successfully.",
      data: bookings,
    });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error. Could not fetch bookings.",
    });
  }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error. Could not delete booking.",
    });
  }
};
