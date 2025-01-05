import express from 'express';
import {
    createSubscriber,
    getAllSubscribers,
    updateSubscriberStatus,
    deleteSubscriber
} from '../controllers/newsletterSubscriberController.js';

const router = express.Router();

router.post('/', createSubscriber);
router.get('/', getAllSubscribers);
router.put('/:id', updateSubscriberStatus);
router.delete('/:id', deleteSubscriber);

export default router;
