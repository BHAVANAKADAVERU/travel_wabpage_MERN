import NewsletterSubscriber from '../models/NewsletterSubscriber.js';

export const createSubscriber = async (req, res) => {
    try {
        const newSubscriber = new NewsletterSubscriber(req.body);
        const savedSubscriber = await newSubscriber.save();
        res.status(201).json({ success: true, message: 'Subscriber added successfully', data: savedSubscriber });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to add subscriber', error: err.message });
    }
};

export const getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await NewsletterSubscriber.find();
        res.status(200).json({ success: true, data: subscribers });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch subscribers', error: err.message });
    }
};

export const updateSubscriberStatus = async (req, res) => {
    try {
        const updatedSubscriber = await NewsletterSubscriber.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSubscriber) return res.status(404).json({ success: false, message: 'Subscriber not found' });
        res.status(200).json({ success: true, message: 'Subscriber status updated', data: updatedSubscriber });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update subscriber', error: err.message });
    }
};

export const deleteSubscriber = async (req, res) => {
    try {
        const deletedSubscriber = await NewsletterSubscriber.findByIdAndDelete(req.params.id);
        if (!deletedSubscriber) return res.status(404).json({ success: false, message: 'Subscriber not found' });
        res.status(200).json({ success: true, message: 'Subscriber deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete subscriber', error: err.message });
    }
};
