"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { initialPhotos } from "@/data/initialPhotos";
import type { Photo } from "@/types/photo";

interface PhotosContextValue {
  images: Photo[];
  addPhoto: (photo: Photo) => void;
}

const PhotosContext = createContext<PhotosContextValue | null>(null);

export function PhotosProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<Photo[]>(initialPhotos);

  const addPhoto = (photo: Photo) => {
    setImages((prev) => [...prev, photo]);
  };

  return (
    <PhotosContext.Provider value={{ images, addPhoto }}>
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
