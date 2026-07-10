import { Router } from 'express';
import { getContact, updateContact, submitInquiry, getInquiries, updateInquiryStatus } from '../controllers/contactController';
import { protect } from '../middleware/auth';

const router = Router();

// Contact Info (for display on website)
router.get('/', getContact);
router.put('/', protect, updateContact);

// Contact Inquiries (form submissions)
router.post('/inquiries', submitInquiry);               // public
router.get('/inquiries', protect, getInquiries);        // admin
router.patch('/inquiries/:id', protect, updateInquiryStatus); // admin

export default router;
