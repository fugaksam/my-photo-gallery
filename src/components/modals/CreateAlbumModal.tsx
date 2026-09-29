"use client";

import styled from "styled-components";
import { CloseBtn, ModalContent, ModalOverlay } from "@/components/modals/ModalBase";
import type { Photo } from "@/types/photo";

interface CreateAlbumModalProps {
  albumName: string;
  photos: Photo[];
  selectedPhotoIds: number[];
  onNameChange: (name: string) => void;
  onTogglePhoto: (photoId: number) => void;
  onCreate: () => void;
  onClose: () => void;
  isCreating?: boolean;
}

export function CreateAlbumModal({
  albumName,
  photos,
  selectedPhotoIds,
  onNameChange,
  onTogglePhoto,
  onCreate,
  onClose,
  isCreating = false,
}: CreateAlbumModalProps) {
  const selectedSet = new Set(selectedPhotoIds);

  return (
    <ModalOverlay onClick={onClose}>
      <CreateModalContent onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>✕</CloseBtn>
        <ModalTitle>アルバムを作成</ModalTitle>

        <InputLabel htmlFor="album-name">アルバム名</InputLabel>
        <NameInput
          id="album-name"
          type="text"
          value={albumName}
          onChange={(e) => onNameChange(e.target.value)}
          disabled={isCreating}
        />

        <SectionLabel>写真を選択（先頭がサムネイルになります）</SectionLabel>
        {photos.length === 0 ? (
          <Hint>登録済みの写真がありません。先に写真をアップロードしてください。</Hint>
        ) : (
          <PhotoList>
            {photos.map((photo) => {
              const selected = selectedSet.has(photo.id);
              return (
                <PhotoOption
                  key={photo.id}
                  type="button"
                  $selected={selected}
                  onClick={() => onTogglePhoto(photo.id)}
                  disabled={isCreating}
                >
                  <Thumb src={photo.src} alt={photo.title} />
                  <OptionMeta>
                    <OptionTitle>{photo.title}</OptionTitle>
                    <OptionDate>{photo.date}</OptionDate>
                  </OptionMeta>
                  <CheckMark $selected={selected}>{selected ? "✓" : ""}</CheckMark>
                </PhotoOption>
              );
            })}
          </PhotoList>
        )}

        <SelectedCount>{selectedPhotoIds.length} 枚選択中</SelectedCount>
        <SubmitBtn type="button" onClick={onCreate} disabled={isCreating}>
          {isCreating ? "作成中..." : "アルバムを作成する"}
        </SubmitBtn>
      </CreateModalContent>
    </ModalOverlay>
  );
}

const CreateModalContent = styled(ModalContent)`
  background: #1c1c1e;
  padding: 30px;
  border-radius: 16px;
  width: 520px;
  max-width: 90vw;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  align-items: flex-start;
`;

const ModalTitle = styled.h2`
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

const NameInput = styled.input`
  width: 100%;
  padding: 10px;
  background: #2c2c2e;
  border: 1px solid #444;
  border-radius: 6px;
  color: white;
  margin-bottom: 20px;
  box-sizing: border-box;
  outline: none;

  &:focus {
    border-color: #3b82f6;
  }
`;

const SectionLabel = styled.div`
  font-size: 12px;
  color: #aaa;
  margin-bottom: 10px;
`;

const Hint = styled.p`
  margin: 0 0 16px;
  color: #888;
  font-size: 14px;
`;

const PhotoList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 320px;
  overflow-y: auto;
  margin-bottom: 12px;
`;

const PhotoOption = styled.button<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.$selected ? "#3b82f6" : "#333")};
  background: ${(props) => (props.$selected ? "rgba(59, 130, 246, 0.15)" : "#2c2c2e")};
  color: inherit;
  cursor: pointer;
  text-align: left;

  &:hover:not(:disabled) {
    border-color: #555;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Thumb = styled.img`
  width: 56px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
`;

const OptionMeta = styled.div`
  flex: 1;
  min-width: 0;
`;

const OptionTitle = styled.div`
  font-size: 13px;
  font-weight: bold;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const OptionDate = styled.div`
  font-size: 11px;
  color: #888;
  margin-top: 2px;
`;

const CheckMark = styled.div<{ $selected: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1px solid ${(props) => (props.$selected ? "#3b82f6" : "#666")};
  background: ${(props) => (props.$selected ? "#3b82f6" : "transparent")};
  color: white;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const SelectedCount = styled.div`
  font-size: 12px;
  color: #aaa;
  margin-bottom: 12px;
`;

const SubmitBtn = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;

  &:hover:not(:disabled) {
    background-color: #2563eb;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
