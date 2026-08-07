'use client';

import React, { useState } from 'react';
import { Tour } from '@/types';
import { Button } from '@/components/ui/Button';
import { uploadTourImageToStorage, validateImageFile } from '@/lib/storage';
import {
  Sparkles,
  X,
  Upload,
  Trash2,
  Image as ImageIcon,
  Loader2,
  Plus,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface AdminTourModalProps {
  isOpen: boolean;
  editingTour: Partial<Tour> | null;
  onClose: () => void;
  onSave: (tour: Tour) => Promise<void>;
}

export function AdminTourModal({
  isOpen,
  editingTour,
  onClose,
  onSave
}: AdminTourModalProps) {
  const [formData, setFormData] = useState<Partial<Tour>>(editingTour || {});
  const [saveLoading, setSaveLoading] = useState(false);

  // Storage upload states
  const [mainUploadProgress, setMainUploadProgress] = useState<number | null>(null);
  const [galleryUploadProgress, setGalleryUploadProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDraggingMain, setIsDraggingMain] = useState(false);
  const [isDraggingGallery, setIsDraggingGallery] = useState(false);

  if (!isOpen || !editingTour) return null;

  const tourId = formData.id || 'new-tour';

  // Handle Uploading Main Image
  const handleMainImageUpload = async (file: File) => {
    setUploadError(null);
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setUploadError(validation.error || 'Invalid file.');
      return;
    }

    try {
      setMainUploadProgress(0);
      const url = await uploadTourImageToStorage(file, tourId, (percent) => {
        setMainUploadProgress(percent);
      });
      setFormData((prev) => ({ ...prev, imageUrl: url }));
    } catch (err: any) {
      console.error('Failed to upload main image:', err);
      setUploadError(err.message || 'Image upload failed. Please try again.');
    } finally {
      setMainUploadProgress(null);
    }
  };

  // Handle Uploading Gallery Image
  const handleGalleryImageUpload = async (files: FileList | File[]) => {
    setUploadError(null);
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    for (const file of fileArray) {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setUploadError(`Invalid file ${file.name}: ${validation.error}`);
        return;
      }
    }

    try {
      setGalleryUploadProgress(0);
      
      const uploadedUrls: string[] = [];
      let completed = 0;
      
      const uploadPromises = fileArray.map(file => {
        return uploadTourImageToStorage(file, tourId, (percent) => {
          // Progress can fluctuate slightly, but average/latest gives user feedback
        }).then(url => {
          completed++;
          setGalleryUploadProgress(Math.round((completed / fileArray.length) * 100));
          return url;
        });
      });
      
      const newUrls = await Promise.all(uploadPromises);
      
      setFormData((prev) => ({
        ...prev,
        gallery: [...(prev.gallery || []), ...newUrls]
      }));
    } catch (err: any) {
      console.error('Failed to upload gallery image(s):', err);
      setUploadError(err.message || 'Gallery upload failed.');
    } finally {
      setGalleryUploadProgress(null);
    }
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: (prev.gallery || []).filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id || !formData.title) {
      alert("Por favor, completa el ID y el Título del tour antes de guardar.");
      return;
    }

    setSaveLoading(true);
    try {
      const fullTour: Tour = {
        id: formData.id,
        title: formData.title,
        destination: formData.destination || 'Ecuador',
        duration: formData.duration || '7 Days',
        price: Number(formData.price) || 1500,
        imageUrl:
          formData.imageUrl ||
          'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        gallery: formData.gallery || [],
        rating: formData.rating || 5.0,
        reviewsCount: formData.reviewsCount || 10,
        category: formData.category || 'Premium Expedition',
        description: formData.description || '',
        highlights: formData.highlights || [],
        inclusions: formData.inclusions || [],
        exclusions: formData.exclusions || [],
        itinerary: formData.itinerary || []
      };

      await onSave(fullTour);
      onClose();
    } catch (err) {
      alert('Error saving tour package to Firestore');
      console.error(err);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-start justify-center p-0 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-zinc-900 border-0 sm:border border-zinc-200 dark:border-zinc-800 rounded-none sm:rounded-3xl w-full max-w-5xl my-auto flex flex-col text-left text-zinc-900 dark:text-white shadow-2xl relative h-full sm:h-auto max-h-[100dvh] sm:max-h-[90vh]">
        <div className="flex-none flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 p-4 sm:p-6">
          <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span>{formData.id ? 'Edit Tour Package' : 'Create Tour Package'}</span>
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {uploadError && (
          <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{uploadError}</span>
            </div>
            <button onClick={() => setUploadError(null)} className="text-rose-400 hover:text-zinc-900 dark:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style dangerouslySetInnerHTML={{ __html: `div::-webkit-scrollbar { display: none; }` }} />
          <form id="tour-form" onSubmit={handleSubmit} className="space-y-8 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="block text-zinc-600 dark:text-zinc-400 font-semibold uppercase tracking-wider">
                  Tour ID / Slug *
                </label>
                <input
                  type="text"
                  required
                  value={formData.id || ''}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  placeholder="e.g. galapagos-premium-cruise"
                  className="w-full p-2.5 glass-input rounded-xl font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-zinc-600 dark:text-zinc-400 font-semibold uppercase tracking-wider">
                  Destination *
                </label>
                <input
                  type="text"
                  required
                  value={formData.destination || ''}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  placeholder="e.g. Galapagos, Ecuador, Peru"
                  className="w-full p-2.5 glass-input rounded-xl focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-zinc-600 dark:text-zinc-400 font-semibold uppercase tracking-wider">
                Tour Title *
              </label>
              <input
                type="text"
                required
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Andes, Amazon Jungle & Galapagos Expedition"
                className="w-full p-2.5 glass-input rounded-xl text-sm font-semibold focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block text-zinc-600 dark:text-zinc-400 font-semibold uppercase tracking-wider">
                  Duration
                </label>
                <input
                  type="text"
                  required
                  value={formData.duration || ''}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="12 Days / 11 Nights"
                  className="w-full p-2.5 glass-input rounded-xl focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-zinc-600 dark:text-zinc-400 font-semibold uppercase tracking-wider">
                  Price (USD) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.price || 0}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full p-2.5 glass-input rounded-xl font-bold focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-zinc-600 dark:text-zinc-400 font-semibold uppercase tracking-wider">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Premium Expedition"
                  className="w-full p-2.5 glass-input rounded-xl focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* MAIN HERO IMAGE UPLOAD & URL */}
            <div className="space-y-3 glass-input/70 p-6 rounded-2xl border border-zinc-800">
              <div className="flex items-center justify-between">
                <label className="text-zinc-700 dark:text-zinc-300 font-semibold uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-emerald-400" />
                  <span>Main Hero Image (Firebase Storage / URL)</span>
                </label>
                <span className="text-[10px] text-zinc-500">Max 5MB • JPG, PNG, WebP</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                {/* Drag & Drop Upload Zone */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingMain(true);
                  }}
                  onDragLeave={() => setIsDraggingMain(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDraggingMain(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleMainImageUpload(e.dataTransfer.files[0]);
                    }
                  }}
                  className={`sm:col-span-7 border-2 border-dashed rounded-xl p-3 text-center transition-colors relative cursor-pointer ${isDraggingMain
                      ? 'border-emerald-500 bg-emerald-950/30'
                      : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
                    }`}
                >
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleMainImageUpload(e.target.files[0]);
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex items-center justify-center gap-2 text-zinc-600 dark:text-zinc-400">
                    {mainUploadProgress !== null ? (
                      <div className="flex items-center gap-2 text-emerald-400">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="font-semibold">Uploading {mainUploadProgress}%</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-xs">
                          Drag & drop file or <span className="text-emerald-400 font-semibold underline">browse</span>
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* URL Fallback Input */}
                <div className="sm:col-span-5">
                  <input
                    type="url"
                    placeholder="Or paste image URL..."
                    value={formData.imageUrl || ''}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white font-mono text-[11px] focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Thumbnail Preview */}
              {formData.imageUrl && (
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-16 h-12 rounded-lg overflow-hidden border border-zinc-700 relative shrink-0">
                    <img
                      src={formData.imageUrl}
                      alt="Hero Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  </div>
                  <div className="text-[11px] text-zinc-600 dark:text-zinc-400 truncate">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Image set successfully
                    </span>
                    <p className="truncate text-zinc-500 font-mono text-[10px]">{formData.imageUrl}</p>
                  </div>
                </div>
              )}
            </div>

            {/* GALLERY IMAGES UPLOAD SECTION */}
            <div className="space-y-3 glass-input/70 p-6 rounded-2xl border border-zinc-800">
              <div className="flex items-center justify-between">
                <label className="text-zinc-700 dark:text-zinc-300 font-semibold uppercase tracking-wider flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-400" />
                  <span>Tour Gallery Photos</span>
                </label>
                <span className="text-[10px] text-zinc-500">
                  {(formData.gallery || []).length} photos added
                </span>
              </div>

              {/* Gallery File Upload or Add URL */}
              <div className="flex items-center justify-between gap-2 pb-2">
                <span className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold">Upload file or add URL:</span>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, gallery: [...(prev.gallery || []), ''] }))}
                  className="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/30 text-emerald-400 hover:text-zinc-900 dark:text-white rounded-lg text-xs font-semibold transition-all"
                >
                  + Add Image URL
                </button>
              </div>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDraggingGallery(true);
                }}
                onDragLeave={() => setIsDraggingGallery(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDraggingGallery(false);
                  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    handleGalleryImageUpload(e.dataTransfer.files);
                  }
                }}
                className={`border-2 border-dashed rounded-xl p-3 text-center transition-colors relative cursor-pointer ${isDraggingGallery
                    ? 'border-emerald-500 bg-emerald-950/30'
                    : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
                  }`}
              >
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleGalleryImageUpload(e.target.files);
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="flex items-center justify-center gap-2 text-zinc-600 dark:text-zinc-400">
                  {galleryUploadProgress !== null ? (
                    <div className="flex items-center gap-2 text-emerald-400">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="font-semibold">Uploading to Gallery {galleryUploadProgress}%</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-xs">
                        Upload gallery image to Firebase Storage (Drag & Drop or Click)
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Bento Grid Gallery */}
              {formData.gallery && formData.gallery.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                  {formData.gallery.map((imgUrl, idx) => {
                    // Make the first image span 2 columns and 2 rows for a bento box feel
                    const isFeatured = idx === 0;
                    return (
                      <div 
                        key={`${imgUrl}-${idx}`} 
                        className={`relative group rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 ${isFeatured ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'}`}
                      >
                        <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-start justify-end p-2 backdrop-blur-sm pointer-events-none">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveGalleryImage(idx);
                            }}
                            className="p-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl shadow-lg transform scale-90 group-hover:scale-100 transition-all pointer-events-auto relative z-50 cursor-pointer"
                            title="Remove image"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>

            <div className="space-y-1">
              <label className="block text-zinc-600 dark:text-zinc-400 font-semibold uppercase tracking-wider">
                Description
              </label>
              <textarea
                rows={4}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Comprehensive description of the tour package..."
                className="w-full p-2.5 glass-input rounded-xl leading-relaxed focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </form>
        </div>

        <div className="flex-none flex justify-end gap-3 p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-b-3xl">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="tour-form"
            variant="primary"
            disabled={saveLoading}
            className="gap-2 shadow-lg shadow-emerald-900/40 cursor-pointer"
          >
            {saveLoading ? 'Saving to Firestore...' : 'Save Package to Database'}
          </Button>
        </div>
      </div>
    </div>
  );
}
