import express from "express"
import { createTour, deleteTour, getAllTours, getFeaturedTours, getSingleTour, getTourBySearch, getTourCount, updateTour,getToursByCategory } from '../controllers/tourController.js'
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Get single tour
router.get("/:id", getSingleTour);

// Get all tours
router.get("/", getAllTours);

// Get tours by search
router.get("/search/getTourBySearch", getTourBySearch);

// Get tours by category
router.get("/search/getToursByCategory", getToursByCategory);

// Create a new tour
router.post("/", verifyAdmin, createTour);

// Update tour
router.put("/:id", verifyAdmin, updateTour);

// Delete tour
router.delete("/:id", verifyAdmin, deleteTour);

// Get featured tours
router.get("/search/getFeaturedTours", getFeaturedTours);

// Get tour count
router.get("/search/getTourCount", getTourCount);

export default router;
