"use client";

import styled from "styled-components";
import type { AlbumSummary } from "@/types/album";
import { AlbumCard } from "@/components/gallery/AlbumCard";

interface AlbumGridProps {
  albums: AlbumSummary[];
}

export function AlbumGrid({ albums }: AlbumGridProps) {
  if (albums.length === 0) {
    return <EmptyText>アルバムがまだありません</EmptyText>;
  }

  return (
    <Grid>
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
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

const EmptyText = styled.p`
  max-width: 1200px;
  margin: 40px auto 0;
  text-align: center;
  font-size: 16px;
  color: #aaa;
`;
