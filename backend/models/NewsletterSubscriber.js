import mongoose from 'mongoose';

const NewsletterSubscriberSchema = new mongoose.Schema({
    subscriberId: { type: String, required: true, unique: true }, // Unique identifier
    email: { type: String, required: true }, // Email address of the subscriber
    subscriptionDate: { type: Date, default: Date.now }, // Date of subscription
    status: { type: String, enum: ['Subscribed', 'Unsubscribed'], default: 'Subscribed' } // Subscription status
});

export default mongoose.model('NewsletterSubscriber', NewsletterSubscriberSchema);
