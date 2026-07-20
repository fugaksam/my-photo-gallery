"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import styled from "styled-components";
import { PhotoDetail } from "@/components/photos/PhotoDetail";
import { usePhotos } from "@/context/PhotosContext";

export default function PhotoDetailPage() {
  const params = useParams();
  const { images } = usePhotos();
  const id = Number(params.id);
  const photo = images.find((img) => img.id === id);

  return (
    <PageContainer>
      {photo ? (
        <PhotoDetail photo={photo} />
      ) : (
        <NotFound>
          <Message>画像が見つかりませんでした</Message>
          <BackLink href="/">← 一覧へ戻る</BackLink>
        </NotFound>
      )}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  background-color: #0b0b0b;
  color: #f8f9fa;
  min-height: 100vh;
  padding: 20px;
  font-family: "Helvetica Neue", Arial, sans-serif;
`;

const NotFound = styled.div`
  max-width: 900px;
  margin: 80px auto 0;
  text-align: center;
`;

const Message = styled.p`
  font-size: 18px;
  margin-bottom: 24px;
  color: #aaa;
`;

const BackLink = styled(Link)`
  color: #3b82f6;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;

  &:hover {
    opacity: 0.8;
  }
`;
