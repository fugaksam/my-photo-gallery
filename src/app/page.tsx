"use client";

import React, { useState } from "react";
import styled from "styled-components";

// --- TypeScriptの型定義 ---
interface Photo {
  id: number;
  src: string;
  title: string;
  date: string;
}

export default function Home() {
  // 初期データの猫ちゃんたち
  const [images] = useState<Photo[]>([
    { id: 1, src: "/cat1.jpg", title: "どこかを見つめる猫ちゃん", date: "2026/06/02" },
    { id: 2, src: "/cat2.jpg", title: "こっちを見つめる猫ちゃん", date: "2026/06/01" },
    { id: 3, src: "/cat3.jpg", title: "アップの猫ちゃん", date: "2026/06/01" },
    { id: 4, src: "/cat4.jpg", title: "木の枝に手を伸ばす猫ちゃん", date: "2026/06/01" },
    { id: 5, src: "/cat5.jpg", title: "顔を隠す猫ちゃん", date: "2026/06/01" },
    // 画像がもっとあれば、もっと増やしていけます
  ]);

  // 現在拡大表示している画像を管理するState（空のときは null）
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <AppContainer>
      <Header>
        <Title>画像一覧</Title>
        <UploadBtn>＋ Upload</UploadBtn>
      </Header>

      {/* ギャラリー一覧 */}
      <GalleryGrid>
        {images.map((img) => (
          <PhotoCard key={img.id} onClick={() => setSelectedPhoto(img)}>
  <ImageWrapper>
    <Image src={img.src} alt={img.title} />
  </ImageWrapper>
  <PhotoInfo>
    <PhotoTitle>{img.title}</PhotoTitle>
    <PhotoDate>{img.date}</PhotoDate>
  </PhotoInfo>
</PhotoCard>
        ))}
      </GalleryGrid>

      {/* 個別表示画面（モーダル）。selectedPhotoにデータがある時だけ表示 */}
      {selectedPhoto && (
        <ModalOverlay onClick={() => setSelectedPhoto(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseBtn onClick={() => setSelectedPhoto(null)}>✕</CloseBtn>
            <OriginalImage src={selectedPhoto.src} alt={selectedPhoto.title} />
            <ModalInfo>
              <h2>{selectedPhoto.title}</h2>
              <p>撮影日: {selectedPhoto.date}</p>
            </ModalInfo>
          </ModalContent>
        </ModalOverlay>
      )}
    </AppContainer>
  );
}

// --- Styled Components ---
const AppContainer = styled.div`
  background-color: #0b0b0b;
  color: #f8f9fa;
  min-height: 100vh;
  padding: 20px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
`;

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
  &:hover { opacity: 0.8; }
`;

const GalleryGrid = styled.main`
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

const PhotoCard = styled.div`
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

/* ★ここがサイズ統一の魔法の場所 */
const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 3 / 2; /* ★カードの比率を3:2に強制固定 */
  overflow: hidden;
  background-color: #222;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* ★画像サイズがバラバラでも、枠に合わせて綺麗に真ん中で切り抜く */
  display: block;
  transition: filter 0.3s;
  filter: brightness(0.9);

  ${PhotoCard}:hover & {
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

// --- ここから個別表示（モーダル）のスタイル ---
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9); /* 背景をかなり暗くして写真を目立たせる */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  &:hover { color: #ccc; }
`;

const OriginalImage = styled.img`
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain; /* ★オリジナルサイズ（比率）を崩さずに画面内に収める */
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
`;

const ModalInfo = styled.div`
  text-align: center;
  margin-top: 15px;
  h2 { margin: 0 0 5px 0; font-size: 18px; }
  p { margin: 0; font-size: 14px; color: #aaa; }
`;