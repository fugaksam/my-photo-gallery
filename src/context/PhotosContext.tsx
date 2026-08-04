"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createPhoto, fetchPhotos } from "@/lib/api/photos";
import { initialPhotos } from "@/data/initialPhotos";
import type { Photo } from "@/types/photo";

interface PhotosContextValue {
  images: Photo[];
  addPhoto: (photo: Omit<Photo, "id">) => Promise<void>;
  isLoading: boolean;
}

const PhotosContext = createContext<PhotosContextValue | null>(null);

export function PhotosProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<Photo[]>(initialPhotos);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadPhotos() {
      try {
        const photos = await fetchPhotos();
        if (!cancelled) {
          setImages(photos);
        }
      } catch {
        if (!cancelled) {
          setImages(initialPhotos);
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

  const addPhoto = async (photo: Omit<Photo, "id">) => {
    try {
      const created = await createPhoto(photo);
      setImages((prev) => [...prev, created]);
    } catch {
      setImages((prev) => [
        ...prev,
        {
          ...photo,
          id: prev.length > 0 ? Math.max(...prev.map((p) => p.id)) + 1 : 1,
        },
      ]);
    }
  };

  return (
    <PhotosContext.Provider value={{ images, addPhoto, isLoading }}>
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
