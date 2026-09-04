"use client";

import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import type { Photo } from "@/types/photo";
import type { PhotoUpdateInput } from "@/lib/api/photos";

interface PhotoDetailProps {
  photo: Photo;
  onSave: (data: PhotoUpdateInput) => Promise<void>;
  onDelete: () => void;
  isSaving?: boolean;
  isDeleting?: boolean;
}

export function PhotoDetail({
  photo,
  onSave,
  onDelete,
  isSaving = false,
  isDeleting = false,
}: PhotoDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(photo.title);
  const [draftDescription, setDraftDescription] = useState(photo.description ?? "");

  const startEdit = () => {
    setDraftTitle(photo.title);
    setDraftDescription(photo.description ?? "");
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraftTitle(photo.title);
    setDraftDescription(photo.description ?? "");
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!draftTitle.trim()) {
      alert("タイトルを入力してください");
      return;
    }
    if (isSaving) {
      return;
    }
    try {
      await onSave({
        title: draftTitle.trim(),
        description: draftDescription.trim(),
      });
      setIsEditing(false);
    } catch {
      // 親側でアラート済み。編集モードを維持する
    }
  };

  return (
    <Container>
      <BackLink href="/">← 一覧へ戻る</BackLink>
      <ImageWrapper>
        <DetailImage src={photo.src} alt={photo.title} />
      </ImageWrapper>
      <Info>
        {isEditing ? (
          <>
            <FieldLabel htmlFor="photo-title">タイトル</FieldLabel>
            <TitleInput
              id="photo-title"
              type="text"
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              disabled={isSaving}
            />
            <FieldLabel htmlFor="photo-description">説明</FieldLabel>
            <DescriptionInput
              id="photo-description"
              value={draftDescription}
              onChange={(e) => setDraftDescription(e.target.value)}
              rows={4}
              placeholder="説明文を入力（任意）"
              disabled={isSaving}
            />
            <ActionRow>
              <PrimaryBtn type="button" onClick={handleSave} disabled={isSaving}>
                {isSaving ? "保存中..." : "保存する"}
              </PrimaryBtn>
              <SecondaryBtn type="button" onClick={cancelEdit} disabled={isSaving}>
                キャンセル
              </SecondaryBtn>
            </ActionRow>
          </>
        ) : (
          <>
            <Title>{photo.title}</Title>
            <DateText>撮影日: {photo.date}</DateText>
            <DescriptionText>
              {photo.description ? photo.description : "説明はまだありません"}
            </DescriptionText>
            <ActionRow>
              <PrimaryBtn type="button" onClick={startEdit} disabled={isDeleting}>
                編集する
              </PrimaryBtn>
              <DeleteBtn type="button" onClick={onDelete} disabled={isDeleting}>
                {isDeleting ? "削除中..." : "削除する"}
              </DeleteBtn>
            </ActionRow>
          </>
        )}
      </Info>
    </Container>
  );
}

const Container = styled.div`
  max-width: 900px;
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

const ImageWrapper = styled.div`
  width: 100%;
  background-color: #161616;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailImage = styled.img`
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  display: block;
`;

const Info = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0 0 8px 0;
  font-size: 22px;
  font-weight: bold;
`;

const DateText = styled.p`
  margin: 0 0 16px 0;
  font-size: 14px;
  color: #aaa;
`;

const DescriptionText = styled.p`
  margin: 0 0 24px 0;
  font-size: 15px;
  color: #ccc;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const FieldLabel = styled.label`
  display: block;
  text-align: left;
  font-size: 12px;
  color: #aaa;
  margin-bottom: 6px;
`;

const TitleInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 16px;
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

const DescriptionInput = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 20px;
  background: #2c2c2e;
  border: 1px solid #444;
  border-radius: 6px;
  color: white;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  outline: none;
  font-family: inherit;

  &:focus {
    border-color: #3b82f6;
  }
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const PrimaryBtn = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 10px 20px;
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
  padding: 10px 20px;
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

const DeleteBtn = styled.button`
  background: transparent;
  color: #ef4444;
  border: 1px solid #ef4444;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: rgba(239, 68, 68, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
