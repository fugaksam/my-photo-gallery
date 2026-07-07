"use client";

import styled from "styled-components";
import { CloseBtn, ModalContent, ModalOverlay } from "@/components/modals/ModalBase";

interface UploadModalProps {
  newTitle: string;
  selectedFile: File | null;
  onTitleChange: (title: string) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => void;
  onClose: () => void;
}

export function UploadModal({
  newTitle,
  selectedFile,
  onTitleChange,
  onFileChange,
  onUpload,
  onClose,
}: UploadModalProps) {
  return (
    <ModalOverlay onClick={onClose}>
      <UploadModalContent onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>✕</CloseBtn>
        <UploadTitle>画像をアップロード</UploadTitle>

        <InputLabel>タイトルの入力</InputLabel>
        <TitleInput
          type="text"
          placeholder="猫ちゃんのタイトルを入力"
          value={newTitle}
          onChange={(e) => onTitleChange(e.target.value)}
        />

        <UploadAreaLabel>
          <HiddenFileInput type="file" accept="image/*" onChange={onFileChange} />
          {selectedFile ? (
            <FileNameText>選択中: {selectedFile.name}</FileNameText>
          ) : (
            <p>クリックして画像を選択（jpeg, pngなど）</p>
          )}
        </UploadAreaLabel>

        <SubmitBtn onClick={onUpload}>アップロードする</SubmitBtn>
      </UploadModalContent>
    </ModalOverlay>
  );
}

const UploadModalContent = styled(ModalContent)`
  background: #1c1c1e;
  padding: 30px;
  border-radius: 16px;
  width: 450px;
  max-width: 90vw;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
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
  &:focus {
    border-color: #3b82f6;
  }
`;

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
  &:hover {
    border-color: #555;
    background: #323236;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

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
  &:hover {
    background-color: #2563eb;
  }
`;
