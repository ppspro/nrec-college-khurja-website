import { Router } from 'express';
import { getContact, updateContact } from '../controllers/contactController';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', getContact);
router.put('/', protect, updateContact);

export default router;
