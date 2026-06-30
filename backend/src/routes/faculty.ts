import { Router } from 'express';
import { getFaculty, getFacultyById, getAllFacultyAdmin, createFaculty, updateFaculty, deleteFaculty } from '../controllers/facultyController';
import { protect } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.get('/', getFaculty);
router.get('/admin/all', protect, getAllFacultyAdmin);
router.get('/:id', getFacultyById);
router.post('/', protect, upload.single('photo'), createFaculty);
router.put('/:id', protect, upload.single('photo'), updateFaculty);
router.delete('/:id', protect, deleteFaculty);

export default router;
