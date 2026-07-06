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
  const [images, setImages] = useState<Photo[]>([
    { id: 1, src: "/cat1.jpg", title: "どこかを見つめる猫ちゃん", date: "2026/06/02" },
    { id: 2, src: "/cat2.jpg", title: "こっちを見つめる猫ちゃん", date: "2026/06/01" },
    { id: 3, src: "/cat3.jpg", title: "アップの猫ちゃん", date: "2026/06/01" },
    { id: 4, src: "/cat4.jpg", title: "木の枝に手を伸ばす猫ちゃん", date: "2026/06/01" },
    { id: 5, src: "/cat5.jpg", title: "顔を隠す猫ちゃん", date: "2026/06/01" },
  ]);

  // 現在拡大表示している画像を管理するState
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // アップロード用モーダルの開閉を管理するState
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);

  // 入力された新しい画像のタイトルを保持するState
  const [newTitle, setNewTitle] = useState<string>("");

  // ★追加: 選択された画像ファイルを保持するState
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // ★追加: ファイルが選択されたときの処理
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // アップロード処理を行う関数
  const handleUpload = () => {
    if (!newTitle.trim()) {
      alert("タイトルを入力してください");
      return;
    }
    // ★追加: ファイルが選択されているかチェック
    if (!selectedFile) {
      alert("画像ファイルを選択してください");
      return;
    }

    // 今日の日付を取得 (YYYY/MM/DD 形式)
    const today = new Date();
    const formattedDate = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}`;

    // ★修正: 選択されたファイルからブラウザ内の一時的なURL（Blob URL）を生成する
    const imageUrl = URL.createObjectURL(selectedFile);

    // 新しい画像データを作成
    const newPhoto: Photo = {
      id: images.length + 1,
      src: imageUrl, // ★生成したURLをセット
      title: newTitle,
      date: formattedDate,
    };

    // 一覧のStateを更新
    setImages([...images, newPhoto]);

    // 入力欄とファイルをリセットしてモーダルを閉じる
    setNewTitle("");
    setSelectedFile(null);
    setIsUploadOpen(false);
  };

  return (
    <AppContainer>
      <Header>
        <Title>画像一覧</Title>
        <UploadBtn onClick={() => setIsUploadOpen(true)}>＋ Upload</UploadBtn>
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

      {/* 個別表示画面（モーダル） */}
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

      {/* アップロード用モーダル */}
      {isUploadOpen && (
        <ModalOverlay onClick={() => { setIsUploadOpen(false); setSelectedFile(null); setNewTitle(""); }}>
          <UploadModalContent onClick={(e) => e.stopPropagation()}>
            <CloseBtn onClick={() => { setIsUploadOpen(false); setSelectedFile(null); setNewTitle(""); }}>✕</CloseBtn>
            <UploadTitle>画像をアップロード</UploadTitle>
            
            <InputLabel>タイトルの入力</InputLabel>
            <TitleInput 
              type="text" 
              placeholder="猫ちゃんのタイトルを入力" 
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />

            {/* ★修正: 本物のファイル入力と、選択されたファイル名の表示 */}
            <UploadAreaLabel>
              <HiddenFileInput 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
              {selectedFile ? (
                <FileNameText>選択中: {selectedFile.name}</FileNameText>
              ) : (
                <p>クリックして画像を選択（jpeg, pngなど）</p>
              )}
            </UploadAreaLabel>

            <SubmitBtn onClick={handleUpload}>アップロードする</SubmitBtn>
          </UploadModalContent>
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
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
  object-fit: contain;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
`;

const ModalInfo = styled.div`
  text-align: center;
  margin-top: 15px;
  h2 { margin: 0 0 5px 0; font-size: 18px; }
  p { margin: 0; font-size: 14px; color: #aaa; }
`;

const UploadModalContent = styled(ModalContent)`
  background: #1c1c1e;
  padding: 30px;
  border-radius: 16px;
  width: 450px;
  max-width: 90vw;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  align-items: flex-start;
`;

const UploadTitle = styled.h2`
  margin: 0 0 20px 0;
  font-size: 20px;
  text-align: center;
  width: 100%;
`;

const InputLabel = styled.label`
  font-size: 12px;
  color: #aaa;
  margin-bottom: 5px;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 10px;
  background: #2c2c2e;
  border: 1px solid #444;
  border-radius: 6px;
  color: white;
  margin-bottom: 20px;
  box-sizing: border-box;
  outline: none;
  &:focus { border-color: #3b82f6; }
`;

// ★修正スタイル: エリア全体をクリック可能にするためのLabel
const UploadAreaLabel = styled.label`
  border: 2px dashed #444;
  border-radius: 8px;
  padding: 30px 20px;
  text-align: center;
  color: #888;
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;
  cursor: pointer;
  background: #2c2c2e;
  display: block;
  &:hover { border-color: #555; background: #323236; }
`;

// ★追加スタイル: 本物のinputは見えないように隠す
const HiddenFileInput = styled.input`
  display: none;
  `;

// ★追加スタイル: 選択されたファイル名を目立たせる
const FileNameText = styled.p`
  color: #3b82f6;
  font-weight: bold;
  margin: 0;
`;

const SubmitBtn = styled.button`
  margin-top: 20px;
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  &:hover { background-color: #2563eb; }
`;