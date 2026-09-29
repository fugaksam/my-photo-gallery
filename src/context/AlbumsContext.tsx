"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  createAlbum,
  fetchAlbums,
  updateAlbum,
  type AlbumCreateInput,
  type AlbumUpdateInput,
} from "@/lib/api/albums";
import type { AlbumDetail, AlbumSummary } from "@/types/album";

interface AlbumsContextValue {
  albums: AlbumSummary[];
  isLoading: boolean;
  error: string | null;
  refreshAlbums: () => Promise<void>;
  addAlbum: (data: AlbumCreateInput) => Promise<AlbumDetail>;
  renameAlbum: (id: number, name: string) => Promise<AlbumDetail>;
  updateAlbumPhotos: (id: number, data: AlbumUpdateInput) => Promise<AlbumDetail>;
}

const AlbumsContext = createContext<AlbumsContextValue | null>(null);

function toSummary(detail: AlbumDetail): AlbumSummary {
  return {
    id: detail.id,
    name: detail.name,
    photo_count: detail.photos.length,
    thumbnail_src: detail.photos[0]?.src ?? null,
  };
}

export function AlbumsProvider({ children }: { children: ReactNode }) {
  const [albums, setAlbums] = useState<AlbumSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshAlbums = async () => {
    const next = await fetchAlbums();
    setAlbums(next);
    setError(null);
  };

  useEffect(() => {
    let cancelled = false;

    async function loadAlbums() {
      try {
        const next = await fetchAlbums();
        if (!cancelled) {
          setAlbums(next);
          setError(null);
        }
      } catch {
        if (!cancelled) {
          setAlbums([]);
          setError("アルバムの取得に失敗しました。API が起動しているか確認してください。");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadAlbums();
    return () => {
      cancelled = true;
    };
  }, []);

  const addAlbum = async (data: AlbumCreateInput) => {
    const created = await createAlbum(data);
    setAlbums((prev) => [...prev, toSummary(created)]);
    return created;
  };

  const renameAlbum = async (id: number, name: string) => {
    const updated = await updateAlbum(id, { name });
    setAlbums((prev) =>
      prev.map((album) => (album.id === id ? toSummary(updated) : album)),
    );
    return updated;
  };

  const updateAlbumPhotos = async (id: number, data: AlbumUpdateInput) => {
    const updated = await updateAlbum(id, data);
    setAlbums((prev) =>
      prev.map((album) => (album.id === id ? toSummary(updated) : album)),
    );
    return updated;
  };

  return (
    <AlbumsContext.Provider
      value={{
        albums,
        isLoading,
        error,
        refreshAlbums,
        addAlbum,
        renameAlbum,
        updateAlbumPhotos,
      }}
    >
      {children}
    </AlbumsContext.Provider>
  );
}

export function useAlbums() {
  const context = useContext(AlbumsContext);
  if (!context) {
    throw new Error("useAlbums は AlbumsProvider 内で使用してください");
  }
  return context;
}
