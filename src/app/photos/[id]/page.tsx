"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import styled from "styled-components";
import { PhotoDetail } from "@/components/photos/PhotoDetail";
import {
  deletePhoto,
  fetchPhoto,
  updatePhoto,
  type PhotoUpdateInput,
} from "@/lib/api/photos";
import type { Photo } from "@/types/photo";

type LoadState = "loading" | "ready" | "notfound" | "error";

function parsePhotoId(raw: string | string[] | undefined): number | null {
  if (typeof raw !== "string") {
    return null;
  }
  const id = Number(raw);
  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }
  return id;
}

export default function PhotoDetailPage() {
  const params = useParams();
  const id = parsePhotoId(params.id);

  if (id === null) {
    return (
      <PageContainer>
        <NotFound>
          <Message>画像が見つかりませんでした</Message>
          <BackLink href="/">← 一覧へ戻る</BackLink>
        </NotFound>
      </PageContainer>
    );
  }

  return <PhotoDetailLoader key={id} id={id} />;
}

function PhotoDetailLoader({ id }: { id: number }) {
  const router = useRouter();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadPhoto() {
      try {
        const result = await fetchPhoto(id);
        if (cancelled) {
          return;
        }
        if (result === null) {
          setPhoto(null);
          setLoadState("notfound");
          return;
        }
        setPhoto(result);
        setLoadState("ready");
      } catch {
        if (!cancelled) {
          setPhoto(null);
          setLoadState("error");
        }
      }
    }

    loadPhoto();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleSave = async (data: PhotoUpdateInput) => {
    if (!photo || isSaving) {
      return;
    }

    setIsSaving(true);
    try {
      const updated = await updatePhoto(id, data);
      setPhoto(updated);
    } catch {
      alert("保存に失敗しました。API が起動しているか確認してください。");
      throw new Error("save failed");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!photo || isDeleting) {
      return;
    }
    if (!window.confirm(`「${photo.title}」を削除しますか？`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await deletePhoto(id);
      router.push("/");
    } catch {
      alert("削除に失敗しました。API が起動しているか確認してください。");
      setIsDeleting(false);
    }
  };

  return (
    <PageContainer>
      {loadState === "loading" && <Message>読み込み中...</Message>}
      {loadState === "error" && (
        <NotFound>
          <Message>写真の取得に失敗しました。API が起動しているか確認してください。</Message>
          <BackLink href="/">← 一覧へ戻る</BackLink>
        </NotFound>
      )}
      {loadState === "notfound" && (
        <NotFound>
          <Message>画像が見つかりませんでした</Message>
          <BackLink href="/">← 一覧へ戻る</BackLink>
        </NotFound>
      )}
      {loadState === "ready" && photo && (
        <PhotoDetail
          photo={photo}
          onSave={handleSave}
          onDelete={handleDelete}
          isSaving={isSaving}
          isDeleting={isDeleting}
        />
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
  text-align: center;
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
