import express from 'express';
import {
    createTourGuide,
    getAllTourGuides,
    updateTourGuide,
    deleteTourGuide
} from '../controllers/tourGuideController.js';
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

router.post('/',verifyAdmin , createTourGuide);
router.get('/', verifyAdmin,getAllTourGuides);
router.put('/:id',verifyAdmin, updateTourGuide);
router.delete('/:id',verifyAdmin, deleteTourGuide);

export default router;
