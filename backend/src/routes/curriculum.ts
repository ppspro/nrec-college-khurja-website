import { Router } from 'express';
import { getCurriculum, getAllCurriculumAdmin, createCurriculum, updateCurriculum, deleteCurriculum } from '../controllers/curriculumController';
import { protect } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.get('/', getCurriculum);
router.get('/admin/all', protect, getAllCurriculumAdmin);
router.post('/', protect, upload.single('pdfFile'), createCurriculum);
router.put('/:id', protect, upload.single('pdfFile'), updateCurriculum);
router.delete('/:id', protect, deleteCurriculum);

export default router;
