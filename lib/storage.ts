import { storage } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

/**
 * Validates file type and max size for image uploads.
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file format (${file.type || 'unknown'}). Please upload JPEG, PNG, WebP, or AVIF images.`
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File size (${sizeMb} MB) exceeds the maximum limit of 5 MB.`
    };
  }

  return { valid: true };
}

/**
 * Uploads an image file to Firebase Storage under /tours/[tourId]/
 * Returns the public download URL.
 */
export async function uploadTourImageToStorage(
  file: File,
  tourId: string = 'general',
  onProgress?: (progressPercent: number) => void
): Promise<string> {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const path = `tours/${tourId}/${Date.now()}_${sanitizedFileName}`;
  const storageRef = ref(storage, path);

  const uploadTask = uploadBytesResumable(storageRef, file, {
    contentType: file.type
  });

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        if (onProgress) onProgress(progress);
      },
      (error) => {
        console.error('Firebase Storage Upload Error:', error);
        reject(error);
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadUrl);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}
