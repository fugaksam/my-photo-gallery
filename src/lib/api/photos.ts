import type { Photo } from "@/types/photo";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export type PhotoCreate = Omit<Photo, "id">;

export async function fetchPhotos(): Promise<Photo[]> {
  const res = await fetch(`${API_BASE_URL}/api/photos`);
  if (!res.ok) {
    throw new Error(`Failed to fetch photos: ${res.status}`);
  }
  return res.json();
}

export async function fetchPhoto(id: number): Promise<Photo> {
  const res = await fetch(`${API_BASE_URL}/api/photos/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch photo: ${res.status}`);
  }
  return res.json();
}

export async function createPhoto(data: PhotoCreate): Promise<Photo> {
  const res = await fetch(`${API_BASE_URL}/api/photos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`Failed to create photo: ${res.status}`);
  }
  return res.json();
}
