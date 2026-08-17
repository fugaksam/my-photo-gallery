"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createPhoto, fetchPhotos, type PhotoUploadInput } from "@/lib/api/photos";
import type { Photo } from "@/types/photo";

interface PhotosContextValue {
  images: Photo[];
  addPhoto: (data: PhotoUploadInput) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const PhotosContext = createContext<PhotosContextValue | null>(null);

export function PhotosProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPhotos() {
      try {
        const photos = await fetchPhotos();
        if (!cancelled) {
          setImages(photos);
          setError(null);
        }
      } catch {
        if (!cancelled) {
          setImages([]);
          setError("写真の取得に失敗しました。API が起動しているか確認してください。");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadPhotos();
    return () => {
      cancelled = true;
    };
  }, []);

  const addPhoto = async (data: PhotoUploadInput) => {
    const created = await createPhoto(data);
    setImages((prev) => [...prev, created]);
  };

  return (
    <PhotosContext.Provider value={{ images, addPhoto, isLoading, error }}>
      {children}
    </PhotosContext.Provider>
  );
}

export function usePhotos() {
  const context = useContext(PhotosContext);
  if (!context) {
    throw new Error("usePhotos は PhotosProvider 内で使用してください");
  }
  return context;
}
