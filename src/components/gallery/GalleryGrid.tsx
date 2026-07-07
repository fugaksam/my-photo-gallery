"use client";

import styled from "styled-components";
import type { Photo } from "@/types/photo";
import { PhotoCard } from "@/components/gallery/PhotoCard";

interface GalleryGridProps {
  images: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

export function GalleryGrid({ images, onPhotoClick }: GalleryGridProps) {
  return (
    <Grid>
      {images.map((img) => (
        <PhotoCard key={img.id} photo={img} onClick={() => onPhotoClick(img)} />
      ))}
    </Grid>
  );
}

const Grid = styled.main`
  display: grid;
  max-width: 1200px;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;
