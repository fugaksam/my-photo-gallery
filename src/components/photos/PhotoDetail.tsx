"use client";

import Link from "next/link";
import styled from "styled-components";
import type { Photo } from "@/types/photo";

interface PhotoDetailProps {
  photo: Photo;
}

export function PhotoDetail({ photo }: PhotoDetailProps) {
  return (
    <Container>
      <BackLink href="/">← 一覧へ戻る</BackLink>
      <ImageWrapper>
        <DetailImage src={photo.src} alt={photo.title} />
      </ImageWrapper>
      <Info>
        <Title>{photo.title}</Title>
        <DateText>撮影日: {photo.date}</DateText>
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
  margin: 0;
  font-size: 14px;
  color: #aaa;
`;
