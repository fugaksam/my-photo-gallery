"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import styled from "styled-components";
import { AlbumDetailView } from "@/components/albums/AlbumDetailView";
import { fetchAlbum, updateAlbum } from "@/lib/api/albums";
import type { AlbumDetail } from "@/types/album";

type LoadState = "loading" | "ready" | "notfound" | "error";

function parseAlbumId(raw: string | string[] | undefined): number | null {
  if (typeof raw !== "string") {
    return null;
  }
  const id = Number(raw);
  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }
  return id;
}

export default function AlbumDetailPage() {
  const params = useParams();
  const id = parseAlbumId(params.id);

  if (id === null) {
    return (
      <PageContainer>
        <NotFound>
          <Message>アルバムが見つかりませんでした</Message>
          <BackLink href="/">← 一覧へ戻る</BackLink>
        </NotFound>
      </PageContainer>
    );
  }

  return <AlbumDetailLoader key={id} id={id} />;
}

function AlbumDetailLoader({ id }: { id: number }) {
  const [album, setAlbum] = useState<AlbumDetail | null>(null);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadAlbum() {
      try {
        const result = await fetchAlbum(id);
        if (cancelled) {
          return;
        }
        if (result === null) {
          setAlbum(null);
          setLoadState("notfound");
          return;
        }
        setAlbum(result);
        setLoadState("ready");
      } catch {
        if (!cancelled) {
          setAlbum(null);
          setLoadState("error");
        }
      }
    }

    loadAlbum();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleSaveName = async (name: string) => {
    if (!album || isSaving) {
      return;
    }

    setIsSaving(true);
    try {
      const updated = await updateAlbum(id, { name });
      setAlbum(updated);
    } catch {
      alert("保存に失敗しました。API が起動しているか確認してください。");
      throw new Error("save failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <PageContainer>
      {loadState === "loading" && <Message>読み込み中...</Message>}
      {loadState === "error" && (
        <NotFound>
          <Message>アルバムの取得に失敗しました。API が起動しているか確認してください。</Message>
          <BackLink href="/">← 一覧へ戻る</BackLink>
        </NotFound>
      )}
      {loadState === "notfound" && (
        <NotFound>
          <Message>アルバムが見つかりませんでした</Message>
          <BackLink href="/">← 一覧へ戻る</BackLink>
        </NotFound>
      )}
      {loadState === "ready" && album && (
        <AlbumDetailView
          album={album}
          onSaveName={handleSaveName}
          isSaving={isSaving}
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
