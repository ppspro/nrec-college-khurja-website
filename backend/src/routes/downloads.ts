import { Router } from 'express';
import { getDownloads, getAllDownloadsAdmin, createDownload, updateDownload, deleteDownload } from '../controllers/downloadController';
import { protect } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.get('/', getDownloads);
router.get('/admin/all', protect, getAllDownloadsAdmin);
router.post('/', protect, upload.single('file'), createDownload);
router.put('/:id', protect, upload.single('file'), updateDownload);
router.delete('/:id', protect, deleteDownload);

export default router;
