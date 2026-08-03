'use client';

import { useState, useEffect, useCallback } from 'react';
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { defaultSettings } from '@/lib/seed';

export function useSettings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        setLoading(true);
        const docRef = doc(db, 'settings', 'general');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings(docSnap.data() as typeof defaultSettings);
        } else {
          // If no settings document exists, create it with default settings
          await setDoc(docRef, defaultSettings);
          setSettings(defaultSettings);
        }
      } catch (err: any) {
        console.warn('Failed to load settings from Firestore, using default values:', err);
        setError(err.message || 'Failed to load settings');
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const saveSettings = useCallback(async (newSettings: typeof defaultSettings) => {
    try {
      setLoading(true);
      const docRef = doc(db, 'settings', 'general');
      await setDoc(docRef, newSettings, { merge: true });
      setSettings(newSettings);
      return true;
    } catch (err: any) {
      console.error('Error saving settings:', err);
      setError(err.message || 'Failed to save settings');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadImage = useCallback(async (file: File, folder: string = 'settings'): Promise<string> => {
    try {
      const uniqueName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const storageRef = ref(storage, `uploads/${folder}/${uniqueName}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (err: any) {
      console.error('Error uploading image to storage:', err);
      throw err;
    }
  }, []);

  return {
    settings,
    loading,
    error,
    saveSettings,
    uploadImage,
  };
}
