import { Router } from 'express';
import { getEvents, getEventBySlug, getAllEventsAdmin, createEvent, updateEvent, deleteEvent } from '../controllers/eventController';
import { protect } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.get('/', getEvents);
router.get('/admin/all', protect, getAllEventsAdmin);
router.get('/:slug', getEventBySlug);
router.post('/', protect, upload.single('image'), createEvent);
router.put('/:id', protect, upload.single('image'), updateEvent);
router.delete('/:id', protect, deleteEvent);

export default router;
