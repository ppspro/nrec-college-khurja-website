import { Router } from 'express';
import { getNotices, getNoticeById, createNotice, updateNotice, deleteNotice, togglePin } from '../controllers/noticeController';
import { protect } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

// Public
router.get('/', getNotices);
router.get('/:id', getNoticeById);

// Protected (Admin)
router.post('/', protect, upload.single('attachment'), createNotice);
router.put('/:id', protect, upload.single('attachment'), updateNotice);
router.delete('/:id', protect, deleteNotice);
router.patch('/:id/pin', protect, togglePin);

export default router;
