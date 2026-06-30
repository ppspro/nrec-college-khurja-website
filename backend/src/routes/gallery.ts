import { Router } from 'express';
import { getAlbums, getAlbumImages, getAllAlbumsAdmin, createAlbum, updateAlbum, deleteAlbum, addImages, deleteImage } from '../controllers/galleryController';
import { protect } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.get('/', getAlbums);
router.get('/admin/all', protect, getAllAlbumsAdmin);
router.get('/:slug', getAlbumImages);

router.post('/albums', protect, upload.single('coverImage'), createAlbum);
router.put('/albums/:id', protect, upload.single('coverImage'), updateAlbum);
router.delete('/albums/:id', protect, deleteAlbum);

router.post('/images', protect, upload.array('images', 20), addImages);
router.delete('/images/:id', protect, deleteImage);

export default router;
