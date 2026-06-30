import { Router } from 'express';
import { getCourses, getCourseBySlug, getAllCoursesAdmin, createCourse, updateCourse, deleteCourse } from '../controllers/courseController';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', getCourses);
router.get('/admin/all', protect, getAllCoursesAdmin);
router.get('/:slug', getCourseBySlug);
router.post('/', protect, createCourse);
router.put('/:id', protect, updateCourse);
router.delete('/:id', protect, deleteCourse);

export default router;
