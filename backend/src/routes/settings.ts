import { Router } from 'express';
import { getSettings, updateSettings, getPage, upsertPage, getSliders, getAllSlidersAdmin, createSlider, updateSlider, deleteSlider } from '../controllers/settingsController';
import { protect } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

// Settings
router.get('/', getSettings);
router.put('/', protect, upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'favicon', maxCount: 1 }]), updateSettings);

// Pages
router.get('/pages/:key', getPage);
router.put('/pages/:key', protect, upload.single('bannerImage'), upsertPage);

// Sliders
router.get('/sliders', getSliders);
router.get('/sliders/admin/all', protect, getAllSlidersAdmin);
router.post('/sliders', protect, upload.single('image'), createSlider);
router.put('/sliders/:id', protect, upload.single('image'), updateSlider);
router.delete('/sliders/:id', protect, deleteSlider);

export default router;
