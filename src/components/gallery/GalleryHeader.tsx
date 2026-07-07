"use client";

import styled from "styled-components";

interface GalleryHeaderProps {
  onUploadClick: () => void;
}

export function GalleryHeader({ onUploadClick }: GalleryHeaderProps) {
  return (
    <Header>
      <Title>画像一覧</Title>
      <UploadBtn onClick={onUploadClick}>＋ Upload</UploadBtn>
    </Header>
  );
}

const Header = styled.header`
  max-width: 1200px;
  margin: 0 auto 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  letter-spacing: 1px;
`;

const UploadBtn = styled.div`
  color: #3b82f6;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    opacity: 0.8;
  }
`;
