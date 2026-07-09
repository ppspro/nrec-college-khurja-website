import { Router } from 'express';
import { getMenus, getMenuByKey, updateMenu } from '../controllers/menuController';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', getMenus);
router.get('/:key', getMenuByKey);
router.put('/:key', protect, updateMenu);

export default router;
