'use client';

import React, { useState } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { Button } from '@/components/ui/Button';
import { getLocalizedText } from '@/utils/i18nHelper';
import { Save, Upload, Plus, Trash2, HelpCircle, FileText, Phone, Award, Layers, Globe } from 'lucide-react';

export function AdminSettingsPanel() {
  const { settings, loading, error, saveSettings, uploadImage } = useSettings();
  const [localSettings, setLocalSettings] = useState(settings);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'hero' | 'about' | 'contact' | 'faqs'>('hero');
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  // Sync state with settings once loaded
  React.useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  const handleTextChange = (section: string, field: string, value: string) => {
    setLocalSettings((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleFAQChange = (index: number, field: 'question' | 'answer', value: string) => {
    const updatedFaqs = [...(localSettings.faq || [])];
    updatedFaqs[index] = {
      ...updatedFaqs[index],
      [field]: value,
    };
    setLocalSettings((prev: any) => ({
      ...prev,
      faq: updatedFaqs,
    }));
  };

  const handleAddFAQ = () => {
    setLocalSettings((prev: any) => ({
      ...prev,
      faq: [...(prev.faq || []), { question: 'New Question?', answer: 'Answer here.' }],
    }));
  };

  const handleRemoveFAQ = (index: number) => {
    const updatedFaqs = (localSettings.faq || []).filter((_, i) => i !== index);
    setLocalSettings((prev: any) => ({
      ...prev,
      faq: updatedFaqs,
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, section: string, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fieldId = `${section}-${field}`;
      setUploadingField(fieldId);
      const downloadURL = await uploadImage(file, section);
      
      setLocalSettings((prev: any) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: downloadURL,
        },
      }));
      alert('Image uploaded successfully to Firebase Storage!');
    } catch (err: any) {
      alert('Failed to upload image: ' + err.message);
    } finally {
      setUploadingField(null);
    }
  };

  const handleHeroGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      setUploadingField('hero-gallery');
      
      const uploadPromises = files.map(file => uploadImage(file, 'hero'));
      const downloadURLs = await Promise.all(uploadPromises);
      
      setLocalSettings((prev: any) => {
        const currentImgs = prev.hero?.backgroundImages || [];
        return {
          ...prev,
          hero: {
            ...prev.hero,
            backgroundImages: [...currentImgs, ...downloadURLs]
          }
        };
      });
    } catch (err: any) {
      alert('Failed to upload hero image(s): ' + err.message);
    } finally {
      setUploadingField(null);
      e.target.value = ''; // Reset input
    }
  };

  const handleRemoveHeroImage = (indexToRemove: number) => {
    setLocalSettings((prev: any) => {
      const currentImgs = prev.hero?.backgroundImages || [];
      return {
        ...prev,
        hero: {
          ...prev.hero,
          backgroundImages: currentImgs.filter((_: any, idx: number) => idx !== indexToRemove)
        }
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveSettings(localSettings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      alert('Error saving settings: ' + err.message);
    }
  };

  if (loading && !localSettings) {
    return (
      <div className="p-8 text-center text-zinc-600 dark:text-zinc-400">
        <div className="flex items-center justify-center gap-3">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span>Syncing settings with Firestore...</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900/80 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-zinc-900 dark:text-white">Website CMS Configurator</h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Manage every section, image, and contact parameter on the landing page</p>
        </div>
        <div className="flex items-center gap-2">
          {saveSuccess && (
            <span className="text-xs text-emerald-400 font-semibold animate-pulse mr-2">✓ Settings Saved Live!</span>
          )}
          <Button type="submit" variant="primary" size="sm" className="gap-2">
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </Button>
        </div>
      </div>

      {/* Sub tabs navigation */}
      <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-transparent glass-input p-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80">
        <button
          type="button"
          onClick={() => setActiveSubTab('hero')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${activeSubTab === 'hero'
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'
                }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Hero & Header</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('about')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${activeSubTab === 'about'
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'
                }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>About Us & Metrics</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('contact')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${activeSubTab === 'contact'
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'
                }`}
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Contact & Footer</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('faqs')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${activeSubTab === 'faqs'
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'
                }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>FAQs (Also Asked)</span>
        </button>
      </div>

      {/* Main CMS sections */}
      <div className="space-y-6 pt-2">
        {/* HERO SECTION TAB */}
        {activeSubTab === 'hero' && (
          <div className="space-y-4">
            <div className="glass-input p-5 rounded-2xl border border-zinc-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold font-oswald text-zinc-900 dark:text-white">Hero Section</h4>
                  <p className="text-xs text-zinc-500">Manage the slides that appear in the immersive fullscreen hero. Ensure you upload high-quality landscape images (16:9 aspect ratio).</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newSlide = { place: 'New Place', title: 'TITLE', title2: 'TWO', description: 'Description here', image: '' };
                    const currentSlides = localSettings.hero?.slides || [];
                    handleTextChange('hero', 'slides', [...currentSlides, newSlide] as any);
                  }}
                  className="gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Slide</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
                {(localSettings.hero?.slides || []).map((slide: any, sIdx: number) => (
                  <div key={sIdx} className="relative bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group">
                    {/* Header Image Preview with Delete Button */}
                    <div className="relative aspect-[16/9] w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
                      {slide.image ? (
                        <img src={slide.image} alt={slide.place || "Slide preview"} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 gap-1.5 p-4">
                          <Upload className="w-6 h-6 text-zinc-400" />
                          <span className="text-xs font-medium">No Image Uploaded</span>
                        </div>
                      )}
                      
                      {/* Slide Number Badge */}
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded-md">
                        #{sIdx + 1}
                      </span>

                      {/* Delete Slide Button */}
                      <button
                        type="button"
                        onClick={() => {
                          const updatedSlides = [...localSettings.hero.slides];
                          updatedSlides.splice(sIdx, 1);
                          handleTextChange('hero', 'slides', updatedSlides as any);
                        }}
                        className="absolute top-2.5 right-2.5 p-1.5 bg-rose-500/90 hover:bg-rose-600 text-white rounded-full shadow-md z-10 transition-colors"
                        title="Remove slide"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Change Image Button Overlay */}
                      <div className="absolute bottom-2 right-2">
                        <input
                          type="file"
                          accept="image/*"
                          id={`slide-img-${sIdx}`}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            try {
                              setUploadingField(`slide-${sIdx}`);
                              const downloadURL = await uploadImage(file, 'hero');
                              const updatedSlides = [...localSettings.hero.slides];
                              updatedSlides[sIdx].image = downloadURL;
                              handleTextChange('hero', 'slides', updatedSlides as any);
                            } catch (err: any) {
                              alert('Upload failed: ' + err.message);
                            } finally {
                              setUploadingField(null);
                            }
                          }}
                          className="hidden"
                        />
                        <label
                          htmlFor={`slide-img-${sIdx}`}
                          className="flex items-center gap-1 px-2.5 py-1 bg-black/70 hover:bg-emerald-600 backdrop-blur-md text-white rounded-md text-[10px] font-medium cursor-pointer transition-colors"
                        >
                          <Upload className="w-3 h-3" />
                          <span>{uploadingField === `slide-${sIdx}` ? 'Uploading...' : 'Change Image'}</span>
                        </label>
                      </div>
                    </div>
                    
                    {/* Content Fields */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-2.5">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Eyebrow Location (Place)</label>
                          <input
                            type="text"
                            value={slide.place}
                            onChange={(e) => {
                              const updated = [...localSettings.hero.slides];
                              updated[sIdx].place = e.target.value;
                              handleTextChange('hero', 'slides', updated as any);
                            }}
                            placeholder="e.g. Galapagos - Santa Cruz"
                            className="w-full px-2.5 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-zinc-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Title 1</label>
                            <input
                              type="text"
                              value={slide.title}
                              onChange={(e) => {
                                const updated = [...localSettings.hero.slides];
                                updated[sIdx].title = e.target.value;
                                handleTextChange('hero', 'slides', updated as any);
                              }}
                              placeholder="e.g. GIANT"
                              className="w-full px-2.5 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-zinc-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Title 2</label>
                            <input
                              type="text"
                              value={slide.title2}
                              onChange={(e) => {
                                const updated = [...localSettings.hero.slides];
                                updated[sIdx].title2 = e.target.value;
                                handleTextChange('hero', 'slides', updated as any);
                              }}
                              placeholder="e.g. TORTOISES"
                              className="w-full px-2.5 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-zinc-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Description</label>
                          <textarea
                            value={slide.description}
                            onChange={(e) => {
                              const updated = [...localSettings.hero.slides];
                              updated[sIdx].description = e.target.value;
                              handleTextChange('hero', 'slides', updated as any);
                            }}
                            rows={3}
                            placeholder="Slide description..."
                            className="w-full px-2.5 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-zinc-900 dark:text-white focus:border-emerald-500 focus:outline-none resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO metadata section inside Hero */}
            <div className="glass-input p-5 rounded-2xl border border-zinc-800/80 space-y-4">
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-emerald-500" />
                <span>SEO & Search Engine Metadata</span>
              </h4>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Website SEO Title (Google Search Result)</label>
                  <input
                    type="text"
                    value={localSettings.seo?.title || ''}
                    onChange={(e) => handleTextChange('seo', 'title', e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">SEO Meta Description</label>
                  <textarea
                    value={localSettings.seo?.description || ''}
                    onChange={(e) => handleTextChange('seo', 'description', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">SEO Keywords (comma separated)</label>
                  <input
                    type="text"
                    value={localSettings.seo?.keywords || ''}
                    onChange={(e) => handleTextChange('seo', 'keywords', e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ABOUT US TAB */}
        {activeSubTab === 'about' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Section Title</label>
                <input
                  type="text"
                  value={localSettings.about?.title || ''}
                  onChange={(e) => handleTextChange('about', 'title', e.target.value)}
                  className="w-full px-4 py-2.5 glass-panel border border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Section Subtitle</label>
                <input
                  type="text"
                  value={localSettings.about?.subtitle || ''}
                  onChange={(e) => handleTextChange('about', 'subtitle', e.target.value)}
                  className="w-full px-4 py-2.5 glass-panel border border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Paragraph 1</label>
                <textarea
                  value={localSettings.about?.paragraph1 || ''}
                  onChange={(e) => handleTextChange('about', 'paragraph1', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 glass-panel border border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Paragraph 2</label>
                <textarea
                  value={localSettings.about?.paragraph2 || ''}
                  onChange={(e) => handleTextChange('about', 'paragraph2', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 glass-panel border border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Metrics Row */}
            <div className="glass-input p-5 rounded-2xl border border-zinc-800/80 space-y-4">
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">Trust Metrics & Credentials</h4>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500">Metric 1 Val/Label</label>
                  <input
                    type="text"
                    value={localSettings.about?.metric1Val || ''}
                    onChange={(e) => handleTextChange('about', 'metric1Val', e.target.value)}
                    className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-zinc-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={localSettings.about?.metric1Lbl || ''}
                    onChange={(e) => handleTextChange('about', 'metric1Lbl', e.target.value)}
                    className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-zinc-600 dark:text-zinc-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500">Metric 2 Val/Label</label>
                  <input
                    type="text"
                    value={localSettings.about?.metric2Val || ''}
                    onChange={(e) => handleTextChange('about', 'metric2Val', e.target.value)}
                    className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-zinc-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={localSettings.about?.metric2Lbl || ''}
                    onChange={(e) => handleTextChange('about', 'metric2Lbl', e.target.value)}
                    className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-zinc-600 dark:text-zinc-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500">Metric 3 Val/Label</label>
                  <input
                    type="text"
                    value={localSettings.about?.metric3Val || ''}
                    onChange={(e) => handleTextChange('about', 'metric3Val', e.target.value)}
                    className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-zinc-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={localSettings.about?.metric3Lbl || ''}
                    onChange={(e) => handleTextChange('about', 'metric3Lbl', e.target.value)}
                    className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-zinc-600 dark:text-zinc-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500">Metric 4 Val/Label</label>
                  <input
                    type="text"
                    value={localSettings.about?.metric4Val || ''}
                    onChange={(e) => handleTextChange('about', 'metric4Val', e.target.value)}
                    className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-zinc-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={localSettings.about?.metric4Lbl || ''}
                    onChange={(e) => handleTextChange('about', 'metric4Lbl', e.target.value)}
                    className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-zinc-600 dark:text-zinc-400"
                  />
                </div>
              </div>
            </div>

            <div className="glass-input p-5 rounded-2xl border border-zinc-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">About Section Image</h4>
                  <p className="text-[11px] text-zinc-500">Upload a picture to display alongside the text</p>
                </div>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    id="about-img-upload"
                    onChange={(e) => handleFileUpload(e, 'about', 'imageUrl')}
                    className="hidden"
                  />
                  <label
                    htmlFor="about-img-upload"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-emerald-600 hover:text-zinc-900 dark:text-white rounded-xl text-xs font-medium cursor-pointer transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingField === 'about-imageUrl' ? 'Uploading...' : 'Upload Image'}</span>
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                <div className="sm:col-span-3">
                  <input
                    type="text"
                    readOnly
                    value={localSettings.about?.imageUrl || ''}
                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-600 dark:text-zinc-400 focus:outline-none"
                  />
                </div>
                {localSettings.about?.imageUrl && (
                  <div className="h-16 w-full relative rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 flex items-center justify-center">
                    <img src={localSettings.about.imageUrl} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CONTACT & FOOTER TAB */}
        {activeSubTab === 'contact' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Contact Phone</label>
                <input
                  type="text"
                  value={localSettings.contact?.phone || ''}
                  onChange={(e) => handleTextChange('contact', 'phone', e.target.value)}
                  className="w-full px-4 py-2.5 glass-panel border border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Contact Email</label>
                <input
                  type="email"
                  value={localSettings.contact?.email || ''}
                  onChange={(e) => handleTextChange('contact', 'email', e.target.value)}
                  className="w-full px-4 py-2.5 glass-panel border border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">WhatsApp Link URL</label>
                <input
                  type="text"
                  value={localSettings.contact?.whatsappUrl || ''}
                  onChange={(e) => handleTextChange('contact', 'whatsappUrl', e.target.value)}
                  className="w-full px-4 py-2.5 glass-panel border border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Office Address</label>
                <input
                  type="text"
                  value={localSettings.contact?.address || ''}
                  onChange={(e) => handleTextChange('contact', 'address', e.target.value)}
                  className="w-full px-4 py-2.5 glass-panel border border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">TripAdvisor Link</label>
                <input
                  type="text"
                  value={localSettings.contact?.tripadvisor || ''}
                  onChange={(e) => handleTextChange('contact', 'tripadvisor', e.target.value)}
                  className="w-full px-4 py-2.5 glass-panel border border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Facebook Link</label>
                <input
                  type="text"
                  value={localSettings.contact?.facebook || ''}
                  onChange={(e) => handleTextChange('contact', 'facebook', e.target.value)}
                  className="w-full px-4 py-2.5 glass-panel border border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Instagram Link</label>
                <input
                  type="text"
                  value={localSettings.contact?.instagram || ''}
                  onChange={(e) => handleTextChange('contact', 'instagram', e.target.value)}
                  className="w-full px-4 py-2.5 glass-panel border border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="glass-input p-5 rounded-2xl border border-zinc-800/80 space-y-4">
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">Footer Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Footer Logo Title</label>
                  <input
                    type="text"
                    value={localSettings.footer?.logoText || ''}
                    onChange={(e) => handleTextChange('footer', 'logoText', e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Footer Logo Subtitle</label>
                  <input
                    type="text"
                    value={localSettings.footer?.logoSubtitle || ''}
                    onChange={(e) => handleTextChange('footer', 'logoSubtitle', e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Footer Description Copy</label>
                <textarea
                  value={getLocalizedText(localSettings.footer?.description, 'en')}
                  onChange={(e) => handleTextChange('footer', 'description', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Copyright Bar text</label>
                <input
                  type="text"
                  value={localSettings.footer?.copyright || ''}
                  onChange={(e) => handleTextChange('footer', 'copyright', e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* FAQs TAB */}
        {activeSubTab === 'faqs' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">Interactive FAQs ("Also Asked" queries)</h4>
                <p className="text-[11px] text-zinc-500">Provide direct answers to high-intent questions from Google searches</p>
              </div>
              <button
                type="button"
                onClick={handleAddFAQ}
                className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-zinc-900 dark:text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add FAQ Item</span>
              </button>
            </div>

            <div className="space-y-4">
              {(localSettings.faq || []).map((faqItem: any, index: number) => (
                <div key={index} className="glass-input p-4 rounded-2xl border border-zinc-800/80 space-y-3 relative group">
                  <button
                    type="button"
                    onClick={() => handleRemoveFAQ(index)}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-rose-500 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="space-y-1 pr-8">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Question #{index + 1}</label>
                    <input
                      type="text"
                      value={faqItem.question}
                      onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Answer Content</label>
                    <textarea
                      value={faqItem.answer}
                      onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>
              ))}

              {(!localSettings.faq || localSettings.faq.length === 0) && (
                <p className="text-center text-xs text-zinc-500 py-6">No FAQ items defined. Click "Add FAQ Item" to create one.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
