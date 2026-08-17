import type { Photo } from "@/types/photo";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export type PhotoUploadInput = {
  title: string;
  date: string;
  file: File;
};

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

export async function createPhoto(data: PhotoUploadInput): Promise<Photo> {
  const body = new FormData();
  body.append("title", data.title);
  body.append("date", data.date);
  body.append("file", data.file);

  const res = await fetch(`${API_BASE_URL}/api/photos`, {
    method: "POST",
    body,
  });
  if (!res.ok) {
    throw new Error(`Failed to create photo: ${res.status}`);
  }
  return res.json();
}
