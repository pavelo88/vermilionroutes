'use client';

import { useState, useEffect, useCallback } from 'react';
import { db, storage, auth } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { defaultSettings } from '@/lib/seed';

let cachedSettingsPromise: Promise<typeof defaultSettings> | null = null;
let cachedSettings: typeof defaultSettings | null = null;

export function useSettings() {
  const [settings, setSettings] = useState(cachedSettings || defaultSettings);
  const [loading, setLoading] = useState(!cachedSettings);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedSettings) return;

    async function loadSettings() {
      try {
        if (!cachedSettingsPromise) {
          const docRef = doc(db, 'settings', 'general');
          cachedSettingsPromise = getDoc(docRef).then(docSnap => {
            return docSnap.exists() ? (docSnap.data() as typeof defaultSettings) : defaultSettings;
          });
        }
        const data = await cachedSettingsPromise;
        cachedSettings = data;
        setSettings(data);
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
    // ✅ W-06 FIX: Verificar autenticación antes de intentar escribir en Firestore
    const currentUser = auth.currentUser;
    if (!currentUser) {
      const authError = 'You must be logged in as an admin to save settings.';
      setError(authError);
      throw new Error(authError);
    }

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
