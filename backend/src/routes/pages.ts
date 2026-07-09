import { Router } from 'express';
import { getPages, getPageByKey, updatePage, deletePage } from '../controllers/pageController';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', getPages);
router.get('/:key', getPageByKey);
router.put('/:key', protect, updatePage);
router.delete('/:key', protect, deletePage);

export default router;
