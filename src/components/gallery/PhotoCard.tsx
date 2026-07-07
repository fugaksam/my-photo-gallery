"use client";

import styled from "styled-components";
import type { Photo } from "@/types/photo";

interface PhotoCardProps {
  photo: Photo;
  onClick: () => void;
}

export function PhotoCard({ photo, onClick }: PhotoCardProps) {
  return (
    <Card onClick={onClick}>
      <ImageWrapper>
        <Image src={photo.src} alt={photo.title} />
      </ImageWrapper>
      <PhotoInfo>
        <PhotoTitle>{photo.title}</PhotoTitle>
        <PhotoDate>{photo.date}</PhotoDate>
      </PhotoInfo>
    </Card>
  );
}

const Card = styled.div`
  background: #161616;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  background-color: #222;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: filter 0.3s;
  filter: brightness(0.9);

  ${Card}:hover & {
    filter: brightness(1.1);
  }
`;

const PhotoInfo = styled.div`
  padding: 14px;
`;

const PhotoTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 6px;
  color: #ffffff;
`;

const PhotoDate = styled.div`
  font-size: 12px;
  color: #888;
`;
