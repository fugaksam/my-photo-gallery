"use client";

import styled from "styled-components";
import type { Photo } from "@/types/photo";
import { CloseBtn, ModalContent, ModalOverlay } from "@/components/modals/ModalBase";

interface PhotoViewModalProps {
  photo: Photo;
  onClose: () => void;
}

export function PhotoViewModal({ photo, onClose }: PhotoViewModalProps) {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>✕</CloseBtn>
        <OriginalImage src={photo.src} alt={photo.title} />
        <ModalInfo>
          <h2>{photo.title}</h2>
          <p>撮影日: {photo.date}</p>
        </ModalInfo>
      </ModalContent>
    </ModalOverlay>
  );
}

const OriginalImage = styled.img`
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const ModalInfo = styled.div`
  text-align: center;
  margin-top: 15px;
  h2 {
    margin: 0 0 5px 0;
    font-size: 18px;
  }
  p {
    margin: 0;
    font-size: 14px;
    color: #aaa;
  }
`;
