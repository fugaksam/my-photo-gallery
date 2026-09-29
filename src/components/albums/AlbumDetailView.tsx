"use client";

import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import type { AlbumDetail } from "@/types/album";

interface AlbumDetailViewProps {
  album: AlbumDetail;
  onSaveName: (name: string) => Promise<void>;
  isSaving?: boolean;
}

export function AlbumDetailView({
  album,
  onSaveName,
  isSaving = false,
}: AlbumDetailViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState(album.name);

  const startEdit = () => {
    setDraftName(album.name);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraftName(album.name);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!draftName.trim()) {
      alert("アルバム名を入力してください");
      return;
    }
    if (isSaving) {
      return;
    }
    try {
      await onSaveName(draftName.trim());
      setIsEditing(false);
    } catch {
      // 親側でアラート済み
    }
  };

  return (
    <Container>
      <BackLink href="/">← 一覧へ戻る</BackLink>

      <Header>
        {isEditing ? (
          <EditRow>
            <NameInput
              type="text"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              disabled={isSaving}
              aria-label="アルバム名"
            />
            <PrimaryBtn type="button" onClick={handleSave} disabled={isSaving}>
              {isSaving ? "保存中..." : "保存する"}
            </PrimaryBtn>
            <SecondaryBtn type="button" onClick={cancelEdit} disabled={isSaving}>
              キャンセル
            </SecondaryBtn>
          </EditRow>
        ) : (
          <TitleRow>
            <Title>{album.name}</Title>
            <PrimaryBtn type="button" onClick={startEdit}>
              名前を編集
            </PrimaryBtn>
          </TitleRow>
        )}
        <Meta>{album.photos.length} 枚の写真</Meta>
      </Header>

      {album.photos.length === 0 ? (
        <EmptyText>このアルバムには写真がありません</EmptyText>
      ) : (
        <GalleryGrid images={album.photos} />
      )}
    </Container>
  );
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BackLink = styled(Link)`
  display: inline-block;
  color: #3b82f6;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 24px;
  font-weight: bold;

  &:hover {
    opacity: 0.8;
  }
`;

const Header = styled.div`
  margin-bottom: 28px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
`;

const EditRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const NameInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 10px;
  background: #2c2c2e;
  border: 1px solid #444;
  border-radius: 6px;
  color: white;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #3b82f6;
  }
`;

const Meta = styled.p`
  margin: 10px 0 0;
  font-size: 14px;
  color: #aaa;
`;

const EmptyText = styled.p`
  text-align: center;
  font-size: 16px;
  color: #aaa;
  margin-top: 40px;
`;

const PrimaryBtn = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: #2563eb;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SecondaryBtn = styled.button`
  background: transparent;
  color: #ccc;
  border: 1px solid #666;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.05);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
