"use client";

import Link from "next/link";
import styled from "styled-components";
import type { AlbumSummary } from "@/types/album";

interface AlbumCardProps {
  album: AlbumSummary;
}

export function AlbumCard({ album }: AlbumCardProps) {
  return (
    <Card href={`/albums/${album.id}`}>
      <ImageWrapper>
        {album.thumbnail_src ? (
          <Image src={album.thumbnail_src} alt={album.name} />
        ) : (
          <EmptyThumb>写真なし</EmptyThumb>
        )}
      </ImageWrapper>
      <AlbumInfo>
        <AlbumTitle>{album.name}</AlbumTitle>
        <AlbumMeta>{album.photo_count} 枚</AlbumMeta>
      </AlbumInfo>
    </Card>
  );
}

const Card = styled(Link)`
  background: #161616;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  display: block;

  &:hover {
    transform: translateY(-3px);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  background-color: #222;
  display: flex;
  align-items: center;
  justify-content: center;
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

const EmptyThumb = styled.div`
  color: #666;
  font-size: 14px;
`;

const AlbumInfo = styled.div`
  padding: 14px;
`;

const AlbumTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 6px;
  color: #ffffff;
`;

const AlbumMeta = styled.div`
  font-size: 12px;
  color: #888;
`;
