'use client';
import { useState, useEffect } from 'react';
import { 
  Trash2, Edit2, Plus, ArrowLeft, Upload, Image as ImageIcon, 
  FolderOpen, Play, Check, X, Eye, HelpCircle, Film
} from 'lucide-react';
import api, { uploadsUrl } from '@/lib/api';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ToastContainer from '@/components/ui/ToastContainer';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import SafeImage from '@/components/ui/SafeImage';

interface GalleryAlbum {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  type: 'photo' | 'video';
  isActive: boolean;
  order: number;
  createdAt: string;
}

interface GalleryImage {
  _id: string;
  album: string;
  title: string;
  description: string;
  image: string;
  thumbnail: string;
  videoUrl: string;
  order: number;
  isActive: boolean;
}

export default function AdminGalleryPage() {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<any[]>([]);

  // View state: 'list' | 'album-form' | 'manage-images'
  const [view, setView] = useState<'list' | 'album-form' | 'manage-images'>('list');
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);

  // Album Form State
  const [albumForm, setAlbumForm] = useState({
    title: '',
    description: '',
    type: 'photo' as 'photo' | 'video',
    isActive: true,
    order: 0,
  });
  const [albumCoverFile, setAlbumCoverFile] = useState<File | null>(null);
  const [albumCoverPreview, setAlbumCoverPreview] = useState<string | null>(null);
  const [editingAlbumId, setEditingAlbumId] = useState<string | null>(null);
  const [savingAlbum, setSavingAlbum] = useState(false);

  // Manage Images State
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  // Video image state
  const [videoForm, setVideoForm] = useState({
    title: '',
    description: '',
    videoUrl: '',
    order: 0
  });
  const [addingVideo, setAddingVideo] = useState(false);

  const addToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToasts((prev) => {
      const id = Math.random().toString(36).substring(2, 9);
      setTimeout(() => removeToast(id), 4000);
      return [...prev, { id, message, type }];
    });
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const res = await api.get('/gallery/admin/all');
      setAlbums(res.data.albums || []);
    } catch {
      addToast('Failed to load gallery albums', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleOpenAlbumForm = (album?: GalleryAlbum) => {
    if (album) {
      setEditingAlbumId(album._id);
      setAlbumForm({
        title: album.title,
        description: album.description || '',
        type: album.type,
        isActive: album.isActive,
        order: album.order,
      });
      setAlbumCoverPreview(album.coverImage ? uploadsUrl(album.coverImage) : null);
    } else {
      setEditingAlbumId(null);
      setAlbumForm({
        title: '',
        description: '',
        type: 'photo',
        isActive: true,
        order: 0,
      });
      setAlbumCoverPreview(null);
    }
    setAlbumCoverFile(null);
    setView('album-form');
  };

  const handleAlbumSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!albumForm.title.trim()) {
      addToast('Album title is required', 'error');
      return;
    }
    setSavingAlbum(true);
    try {
      const formData = new FormData();
      formData.append('title', albumForm.title);
      formData.append('description', albumForm.description);
      formData.append('type', albumForm.type);
      formData.append('isActive', String(albumForm.isActive));
      formData.append('order', String(albumForm.order));
      if (albumCoverFile) {
        formData.append('coverImage', albumCoverFile);
      }

      if (editingAlbumId) {
        await api.put(`/gallery/albums/${editingAlbumId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        addToast('Album updated successfully!', 'success');
      } else {
        await api.post('/gallery/albums', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        addToast('Album created successfully!', 'success');
      }
      fetchAlbums();
      setView('list');
    } catch {
      addToast('Failed to save album', 'error');
    } finally {
      setSavingAlbum(false);
    }
  };

  const handleDeleteAlbum = async (id: string) => {
    if (!confirm('Are you sure you want to delete this album and ALL its media items?')) return;
    try {
      await api.delete(`/gallery/albums/${id}`);
      addToast('Album deleted successfully', 'success');
      fetchAlbums();
    } catch {
      addToast('Failed to delete album', 'error');
    }
  };

  const handleManageMedia = async (album: GalleryAlbum) => {
    setSelectedAlbum(album);
    setLoadingImages(true);
    setView('manage-images');
    try {
      const res = await api.get(`/gallery/${album.slug}`);
      setImages(res.data.images || []);
    } catch {
      addToast('Failed to load media items', 'error');
    } finally {
      setLoadingImages(false);
    }
  };

  const refreshImages = async () => {
    if (!selectedAlbum) return;
    try {
      const res = await api.get(`/gallery/${selectedAlbum.slug}`);
      setImages(res.data.images || []);
    } catch {}
  };

  const handleImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0 || !selectedAlbum) return;
    setUploadingFiles(true);
    try {
      const formData = new FormData();
      formData.append('albumId', selectedAlbum._id);
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('images', selectedFiles[i]);
      }
      await api.post('/gallery/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      addToast('Images uploaded successfully!', 'success');
      setSelectedFiles(null);
      refreshImages();
    } catch {
      addToast('Failed to upload images', 'error');
    } finally {
      setUploadingFiles(false);
    }
  };

  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoForm.videoUrl.trim() || !selectedAlbum) {
      addToast('Video URL is required', 'error');
      return;
    }
    setAddingVideo(true);
    try {
      await api.post('/gallery/images', {
        albumId: selectedAlbum._id,
        title: videoForm.title,
        description: videoForm.description,
        videoUrl: videoForm.videoUrl,
        order: videoForm.order
      });
      addToast('Video item added successfully!', 'success');
      setVideoForm({ title: '', description: '', videoUrl: '', order: 0 });
      refreshImages();
    } catch {
      addToast('Failed to add video item', 'error');
    } finally {
      setAddingVideo(false);
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media item?')) return;
    try {
      await api.delete(`/gallery/images/${id}`);
      addToast('Media item deleted successfully', 'success');
      refreshImages();
    } catch {
      addToast('Failed to delete item', 'error');
    }
  };

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {view === 'list' && (
        <>
          <div className="flex justify-between items-center">
            <AdminPageHeader 
              title="Campus Gallery" 
              description="Manage photo albums, video collections, and events media"
            />
            <Button onClick={() => handleOpenAlbumForm()} className="btn-primary rounded-xl flex items-center gap-2">
              <Plus size={16} /> Add Album
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : albums.length === 0 ? (
            <EmptyState 
              icon={<FolderOpen size={48} className="text-gray-400" />}
              title="No albums found"
              description="Create your first photo or video album to get started."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.map((album) => (
                <Card key={album._id} className="overflow-hidden border border-gray-200/50 hover:shadow-md transition-shadow">
                  <div className="relative h-48 bg-gray-100">
                    {album.coverImage ? (
                      <SafeImage 
                        src={uploadsUrl(album.coverImage)} 
                        alt={album.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                        <ImageIcon size={36} />
                        <span className="text-xs mt-1">No cover image</span>
                      </div>
                    )}
                    <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${
                      album.type === 'video' ? 'bg-[#B8860B]' : 'bg-[#990A25]'
                    }`}>
                      {album.type === 'video' ? 'Video Album' : 'Photo Album'}
                    </span>
                  </div>
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{album.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1 min-h-[40px]">
                        {album.description || 'No description provided.'}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>Order: {album.order}</span>
                      <span className={`flex items-center gap-1 font-semibold ${album.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                        {album.isActive ? <Check size={12} /> : <X size={12} />}
                        {album.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                      <Button 
                        onClick={() => handleManageMedia(album)} 
                        className="btn-outline btn-sm rounded-lg flex-1 flex items-center justify-center gap-1.5"
                      >
                        <FolderOpen size={14} /> Manage Media
                      </Button>
                      <button 
                        onClick={() => handleOpenAlbumForm(album)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Album"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteAlbum(album._id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Album"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {view === 'album-form' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setView('list')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-bold text-gray-800">
              {editingAlbumId ? 'Edit Album' : 'Create Album'}
            </h2>
          </div>

          <Card className="p-6 border border-gray-200/50">
            <form onSubmit={handleAlbumSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="form-label">Album Title *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={albumForm.title}
                  onChange={(e) => setAlbumForm({...albumForm, title: e.target.value})}
                  placeholder="e.g. Annual Sports Meet 2026"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="form-label">Description</label>
                <textarea 
                  className="form-input min-h-[100px]" 
                  value={albumForm.description}
                  onChange={(e) => setAlbumForm({...albumForm, description: e.target.value})}
                  placeholder="Provide some details about the event/photos..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="form-label">Album Type</label>
                  <select 
                    className="form-input"
                    value={albumForm.type}
                    onChange={(e) => setAlbumForm({...albumForm, type: e.target.value as 'photo' | 'video'})}
                  >
                    <option value="photo">Photos</option>
                    <option value="video">Videos</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="form-label">Order Priority</label>
                  <input 
                    type="number" 
                    className="form-input"
                    value={albumForm.order}
                    onChange={(e) => setAlbumForm({...albumForm, order: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="form-label">Cover Image</label>
                <div className="flex items-center gap-4">
                  {albumCoverPreview && (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                      <img src={albumCoverPreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setAlbumCoverFile(file);
                          setAlbumCoverPreview(URL.createObjectURL(file));
                        }
                      }}
                      className="form-input"
                    />
                    <p className="text-xs text-gray-400 mt-1">Recommended size: 800x600 pixels (Max: 5MB)</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="isActive"
                  checked={albumForm.isActive}
                  onChange={(e) => setAlbumForm({...albumForm, isActive: e.target.checked})}
                  className="rounded border-gray-300 text-[#990A25] focus:ring-[#990A25]"
                />
                <label htmlFor="isActive" className="text-sm font-semibold text-gray-700 select-none">
                  Published (Visible to public)
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <Button type="button" onClick={() => setView('list')} className="btn-ghost rounded-xl">
                  Cancel
                </Button>
                <Button type="submit" loading={savingAlbum} className="btn-primary rounded-xl">
                  Save Album
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {view === 'manage-images' && selectedAlbum && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setView('list')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft size={20} />
              </button>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{selectedAlbum.title}</h2>
                <p className="text-sm text-gray-400">
                  Manage items in this {selectedAlbum.type === 'video' ? 'video' : 'photo'} album
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload form */}
            <div className="space-y-6">
              <Card className="p-6 border border-gray-200/50">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  {selectedAlbum.type === 'video' ? <Film size={18} /> : <Upload size={18} />}
                  Add new {selectedAlbum.type === 'video' ? 'Video URL' : 'Photos'}
                </h3>

                {selectedAlbum.type === 'photo' ? (
                  <form onSubmit={handleImageUpload} className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-[#990A25] transition-colors relative">
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*"
                        onChange={(e) => setSelectedFiles(e.target.files)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                      <span className="text-sm font-semibold text-gray-600 block">
                        Click or drag to select files
                      </span>
                      <span className="text-xs text-gray-400 block mt-1">
                        Select multiple images at once
                      </span>
                    </div>

                    {selectedFiles && selectedFiles.length > 0 && (
                      <div className="bg-gray-50 rounded-xl p-3 border border-gray-150">
                        <span className="text-xs font-semibold text-gray-600 block mb-1">Selected files:</span>
                        <div className="max-h-32 overflow-y-auto space-y-1">
                          {Array.from(selectedFiles).map((f, i) => (
                            <div key={i} className="text-xs text-gray-500 truncate flex items-center gap-1">
                              <ImageIcon size={10} /> {f.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      loading={uploadingFiles} 
                      disabled={!selectedFiles || selectedFiles.length === 0}
                      className="w-full btn-primary rounded-xl flex items-center justify-center gap-2"
                    >
                      <Upload size={16} /> Upload Photos
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleVideoSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="form-label">Video Title</label>
                      <input 
                        type="text" 
                        className="form-input"
                        value={videoForm.title}
                        onChange={(e) => setVideoForm({...videoForm, title: e.target.value})}
                        placeholder="e.g. Convocation Ceremony Highlights"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="form-label">Description</label>
                      <input 
                        type="text" 
                        className="form-input"
                        value={videoForm.description}
                        onChange={(e) => setVideoForm({...videoForm, description: e.target.value})}
                        placeholder="Short summary of the video content..."
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="form-label">YouTube Video URL *</label>
                      <input 
                        type="url" 
                        className="form-input"
                        value={videoForm.videoUrl}
                        onChange={(e) => setVideoForm({...videoForm, videoUrl: e.target.value})}
                        placeholder="e.g. https://www.youtube.com/watch?v=..."
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="form-label">Order Priority</label>
                      <input 
                        type="number" 
                        className="form-input"
                        value={videoForm.order}
                        onChange={(e) => setVideoForm({...videoForm, order: parseInt(e.target.value) || 0})}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      loading={addingVideo} 
                      className="w-full btn-primary rounded-xl"
                    >
                      Add Video Item
                    </Button>
                  </form>
                )}
              </Card>
            </div>

            {/* Images Grid */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-bold text-gray-800">Album Content ({images.length} items)</h3>
              {loadingImages ? (
                <div className="flex justify-center py-12">
                  <LoadingSpinner />
                </div>
              ) : images.length === 0 ? (
                <EmptyState 
                  icon={<ImageIcon size={32} className="text-gray-400" />}
                  title="No items in album"
                  description="Upload your first photo or add a video URL on the left panel."
                />
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {images.map((item) => (
                    <div key={item._id} className="group relative aspect-video bg-gray-50 border border-gray-200/50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      {item.videoUrl ? (
                        <div className="w-full h-full relative flex items-center justify-center bg-gray-950">
                          {getYoutubeId(item.videoUrl) ? (
                            <img 
                              src={`https://img.youtube.com/vi/${getYoutubeId(item.videoUrl)}/mqdefault.jpg`} 
                              alt={item.title}
                              className="w-full h-full object-cover opacity-60"
                            />
                          ) : (
                            <Film className="text-gray-600" size={32} />
                          )}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center text-white border border-white/20">
                              <Play size={16} fill="white" className="ml-0.5" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <SafeImage 
                          src={uploadsUrl(item.thumbnail || item.image)} 
                          alt={item.title || "Gallery image"}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover"
                        />
                      )}
                      
                      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleDeleteImage(item._id)}
                          className="p-1.5 bg-white text-red-600 border border-gray-200 hover:bg-red-50 rounded-md transition-colors shadow-sm"
                          title="Delete item"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      {item.title && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-white">
                          <p className="text-[11px] font-semibold truncate leading-none">{item.title}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
