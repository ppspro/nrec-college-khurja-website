import { Router } from 'express';
import { uploadMedia, getMedia, removeMedia } from '../controllers/mediaController';
import { protect } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.get('/', protect, getMedia);
router.post('/', protect, upload.array('files', 10), uploadMedia);
router.delete('/:id', protect, removeMedia);

export default router;
