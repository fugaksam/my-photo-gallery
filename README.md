# my-photo-gallery

猫ちゃんの写真を一覧表示するギャラリーアプリです。グリッド表示、詳細ページへの画面遷移、アップロードに対応しています。

一覧・登録・画像本体は別リポジトリの Python API（FastAPI + SQLite BLOB）から取得します。

## 技術スタック

- Frontend: Next.js 16 (App Router), React 19, TypeScript, styled-components
- Backend: [my-photo-gallery-backend](https://github.com/fugaksam/my-photo-gallery-backend)（FastAPI・別リポジトリ）

## ディレクトリ構成

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── photos/[id]/page.tsx
├── components/
├── context/PhotosContext.tsx   # API から一覧取得・登録
├── lib/api/photos.ts           # BE 呼び出し
└── types/photo.ts
```

## Getting Started

### 1. Backend

別リポジトリで API を起動します。

```bash
cd /path/to/my-photo-gallery-backend
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

- API: http://localhost:8000
- Swagger: http://localhost:8000/docs

### 2. Frontend

```bash
cp .env.local.example .env.local
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開いて確認できます。

`.env.local` の例:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

BE が停止している場合は一覧にエラーを表示します。初期画像も含め、表示は DB（`GET /api/photos` と `/api/photos/{id}` / `/api/photos/{id}/image`）のみです。

主な編集ポイント:

- API client: `src/lib/api/photos.ts`
- 共有 state: `src/context/PhotosContext.tsx`
- 一覧: `src/app/page.tsx`
- 詳細: `src/app/photos/[id]/page.tsx`

## Scripts

```bash
npm run dev     # 開発サーバー
npm run build   # 本番ビルド
npm run start   # 本番サーバー
npm run lint    # ESLint
```

## 現状の範囲

- 対応: BE から一覧・詳細画像を取得 / アップロード時に画像本体を DB へ保存

## Vercel へのデプロイ

Next.js アプリをデプロイする最も簡単な方法は、Next.js の開発元である [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) を使うことです。

詳しくは [Next.js のデプロイドキュメント](https://nextjs.org/docs/app/building-your-application/deploying) を参照してください。
