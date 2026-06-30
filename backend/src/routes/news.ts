import { Router } from 'express';
import { getNews, getNewsBySlug, getAllNewsAdmin, createNews, updateNews, deleteNews } from '../controllers/newsController';
import { protect } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.get('/', getNews);
router.get('/admin/all', protect, getAllNewsAdmin);
router.get('/:slug', getNewsBySlug);
router.post('/', protect, upload.single('image'), createNews);
router.put('/:id', protect, upload.single('image'), updateNews);
router.delete('/:id', protect, deleteNews);

export default router;
