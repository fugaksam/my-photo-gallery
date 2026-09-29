import { API_BASE_URL } from "@/lib/api/photos";
import type { AlbumDetail, AlbumSummary } from "@/types/album";

export type AlbumCreateInput = {
  name?: string;
  photo_ids: number[];
};

export type AlbumUpdateInput = {
  name?: string;
  photo_ids?: number[];
};

export function nextDefaultAlbumName(albums: { name: string }[]): string {
  const names = new Set(albums.map((album) => album.name));
  let n = 1;
  while (names.has(`アルバム${n}`)) {
    n += 1;
  }
  return `アルバム${n}`;
}

export async function fetchAlbums(): Promise<AlbumSummary[]> {
  const res = await fetch(`${API_BASE_URL}/api/albums`);
  if (!res.ok) {
    throw new Error(`Failed to fetch albums: ${res.status}`);
  }
  return res.json();
}

export async function fetchAlbum(id: number): Promise<AlbumDetail | null> {
  const res = await fetch(`${API_BASE_URL}/api/albums/${id}`);
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch album: ${res.status}`);
  }
  return res.json();
}

export async function createAlbum(data: AlbumCreateInput): Promise<AlbumDetail> {
  const res = await fetch(`${API_BASE_URL}/api/albums`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      photo_ids: data.photo_ids,
    }),
  });
  if (!res.ok) {
    throw new Error(`Failed to create album: ${res.status}`);
  }
  return res.json();
}

export async function updateAlbum(
  id: number,
  data: AlbumUpdateInput,
): Promise<AlbumDetail> {
  const res = await fetch(`${API_BASE_URL}/api/albums/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.status === 404) {
    throw new Error("Album not found");
  }
  if (!res.ok) {
    throw new Error(`Failed to update album: ${res.status}`);
  }
  return res.json();
}

export async function deleteAlbum(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/albums/${id}`, {
    method: "DELETE",
  });
  if (res.status === 404) {
    throw new Error("Album not found");
  }
  if (!res.ok) {
    throw new Error(`Failed to delete album: ${res.status}`);
  }
}
