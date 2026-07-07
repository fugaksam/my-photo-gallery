"use client";

import { useState } from "react";
import styled from "styled-components";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryHeader } from "@/components/gallery/GalleryHeader";
import { PhotoViewModal } from "@/components/modals/PhotoViewModal";
import { UploadModal } from "@/components/modals/UploadModal";
import { initialPhotos } from "@/data/initialPhotos";
import type { Photo } from "@/types/photo";

export default function Home() {
  const [images, setImages] = useState<Photo[]>(initialPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
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

  const handleUpload = () => {
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
    const imageUrl = URL.createObjectURL(selectedFile);

    const newPhoto: Photo = {
      id: images.length + 1,
      src: imageUrl,
      title: newTitle,
      date: formattedDate,
    };

    setImages([...images, newPhoto]);
    handleCloseUpload();
  };

  return (
    <AppContainer>
      <GalleryHeader onUploadClick={() => setIsUploadOpen(true)} />
      <GalleryGrid images={images} onPhotoClick={setSelectedPhoto} />

      {selectedPhoto && (
        <PhotoViewModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
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
