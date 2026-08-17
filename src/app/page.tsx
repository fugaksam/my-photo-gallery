"use client";

import { useState } from "react";
import styled from "styled-components";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryHeader } from "@/components/gallery/GalleryHeader";
import { UploadModal } from "@/components/modals/UploadModal";
import { PhotosProvider, usePhotos } from "@/context/PhotosContext";

export default function Home() {
  return (
    <PhotosProvider>
      <HomeContent />
    </PhotosProvider>
  );
}

function HomeContent() {
  const { images, addPhoto, isLoading, error } = usePhotos();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleCloseUpload = () => {
    setIsUploadOpen(false);
    setSelectedFile(null);
    setNewTitle("");
  };

  const handleUpload = async () => {
    if (!newTitle.trim()) {
      alert("タイトルを入力してください");
      return;
    }
    if (!selectedFile) {
      alert("画像ファイルを選択してください");
      return;
    }

    const today = new Date();
    const formattedDate = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}`;

    try {
      await addPhoto({
        title: newTitle,
        date: formattedDate,
        file: selectedFile,
      });
      handleCloseUpload();
    } catch {
      alert("アップロードに失敗しました。BE が起動しているか確認してください。");
    }
  };

  return (
    <AppContainer>
      <GalleryHeader onUploadClick={() => setIsUploadOpen(true)} />
      {isLoading ? (
        <StatusText>読み込み中...</StatusText>
      ) : error ? (
        <StatusText>{error}</StatusText>
      ) : (
        <GalleryGrid images={images} />
      )}

      {isUploadOpen && (
        <UploadModal
          newTitle={newTitle}
          selectedFile={selectedFile}
          onTitleChange={setNewTitle}
          onFileChange={handleFileChange}
          onUpload={handleUpload}
          onClose={handleCloseUpload}
        />
      )}
    </AppContainer>
  );
}

const AppContainer = styled.div`
  background-color: #0b0b0b;
  color: #f8f9fa;
  min-height: 100vh;
  padding: 20px;
  font-family: "Helvetica Neue", Arial, sans-serif;
`;

const StatusText = styled.p`
  max-width: 1200px;
  margin: 80px auto 0;
  text-align: center;
  font-size: 16px;
  color: #aaa;
`;
