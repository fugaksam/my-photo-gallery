"use client";

import { useState } from "react";
import styled from "styled-components";
import { AlbumGrid } from "@/components/gallery/AlbumGrid";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryHeader, type GalleryView } from "@/components/gallery/GalleryHeader";
import { CreateAlbumModal } from "@/components/modals/CreateAlbumModal";
import { UploadModal } from "@/components/modals/UploadModal";
import { AlbumsProvider, useAlbums } from "@/context/AlbumsContext";
import { PhotosProvider, usePhotos } from "@/context/PhotosContext";
import { nextDefaultAlbumName } from "@/lib/api/albums";

export default function Home() {
  return (
    <PhotosProvider>
      <AlbumsProvider>
        <HomeContent />
      </AlbumsProvider>
    </PhotosProvider>
  );
}

function HomeContent() {
  const { images, addPhoto, isLoading, error } = usePhotos();
  const {
    albums,
    addAlbum,
    isLoading: albumsLoading,
    error: albumsError,
  } = useAlbums();

  const [view, setView] = useState<GalleryView>("photos");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isCreateAlbumOpen, setIsCreateAlbumOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [albumName, setAlbumName] = useState("");
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<number[]>([]);
  const [isCreatingAlbum, setIsCreatingAlbum] = useState(false);

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

  const openCreateAlbum = () => {
    setAlbumName(nextDefaultAlbumName(albums));
    setSelectedPhotoIds([]);
    setIsCreateAlbumOpen(true);
  };

  const handleCloseCreateAlbum = () => {
    setIsCreateAlbumOpen(false);
    setAlbumName("");
    setSelectedPhotoIds([]);
  };

  const handleTogglePhoto = (photoId: number) => {
    setSelectedPhotoIds((prev) => {
      if (prev.includes(photoId)) {
        return prev.filter((id) => id !== photoId);
      }
      return [...prev, photoId];
    });
  };

  const handleCreateAlbum = async () => {
    if (!albumName.trim()) {
      alert("アルバム名を入力してください");
      return;
    }
    if (selectedPhotoIds.length === 0) {
      alert("写真を1枚以上選択してください");
      return;
    }
    if (isCreatingAlbum) {
      return;
    }

    setIsCreatingAlbum(true);
    try {
      await addAlbum({
        name: albumName.trim(),
        photo_ids: selectedPhotoIds,
      });
      handleCloseCreateAlbum();
      setView("albums");
    } catch {
      alert("アルバムの作成に失敗しました。API が起動しているか確認してください。");
    } finally {
      setIsCreatingAlbum(false);
    }
  };

  const handlePrimaryClick = () => {
    if (view === "photos") {
      setIsUploadOpen(true);
    } else {
      openCreateAlbum();
    }
  };

  const photosStatus = isLoading
    ? "読み込み中..."
    : error
      ? error
      : null;
  const albumsStatus = albumsLoading
    ? "読み込み中..."
    : albumsError
      ? albumsError
      : null;

  return (
    <AppContainer>
      <GalleryHeader
        view={view}
        onViewChange={setView}
        onPrimaryClick={handlePrimaryClick}
      />

      {view === "photos" ? (
        photosStatus ? (
          <StatusText>{photosStatus}</StatusText>
        ) : (
          <GalleryGrid images={images} />
        )
      ) : albumsStatus ? (
        <StatusText>{albumsStatus}</StatusText>
      ) : (
        <AlbumGrid albums={albums} />
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

      {isCreateAlbumOpen && (
        <CreateAlbumModal
          albumName={albumName}
          photos={images}
          selectedPhotoIds={selectedPhotoIds}
          onNameChange={setAlbumName}
          onTogglePhoto={handleTogglePhoto}
          onCreate={handleCreateAlbum}
          onClose={handleCloseCreateAlbum}
          isCreating={isCreatingAlbum}
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
