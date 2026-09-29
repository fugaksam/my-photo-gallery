import type { Photo } from "@/types/photo";

export interface AlbumSummary {
  id: number;
  name: string;
  photo_count: number;
  thumbnail_src: string | null;
}

export interface AlbumDetail {
  id: number;
  name: string;
  photos: Photo[];
}
