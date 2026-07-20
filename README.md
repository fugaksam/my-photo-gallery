# my-photo-gallery

猫ちゃんの写真を一覧表示するギャラリーアプリです。グリッド表示、詳細ページへの画面遷移、アップロード（ブラウザ内のみ、リロードで消える）に対応しています。

## 技術スタック

- Next.js 16 (App Router)
- React 19
- TypeScript
- styled-components

## ディレクトリ構成

```
src/
├── app/                    # ルーティング・レイアウト
│   ├── layout.tsx          # PhotosProvider でラップ
│   ├── page.tsx            # 画像一覧
│   ├── photos/
│   │   └── [id]/
│   │       └── page.tsx    # 画像詳細（/photos/[id]）
│   └── globals.css
├── components/
│   ├── gallery/            # 一覧 UI（Header / Grid / Card）
│   ├── photos/             # 詳細 UI（PhotoDetail）
│   └── modals/             # アップロード用モーダル
├── context/
│   └── PhotosContext.tsx   # 写真一覧の共有 state
├── data/
│   └── initialPhotos.ts    # 初期画像データ
└── types/
    └── photo.ts            # 型定義

public/
└── images/                 # 静的画像アセット
```

## Getting Started

開発サーバーを起動:

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開いて確認できます。画像をクリックすると `/photos/[id]` の詳細ページへ遷移します。

主な編集ポイント:

- 画像一覧: `src/app/page.tsx`
- 画像詳細: `src/app/photos/[id]/page.tsx` / `src/components/photos/`
- 写真の共有 state: `src/context/PhotosContext.tsx`
- ギャラリー UI: `src/components/gallery/`
- アップロード UI: `src/components/modals/`
- 初期データ: `src/data/initialPhotos.ts`

## Scripts

```bash
npm run dev     # 開発サーバー
npm run build   # 本番ビルド
npm run start   # 本番サーバー
npm run lint    # ESLint
```

## Vercel へのデプロイ

Next.js アプリをデプロイする最も簡単な方法は、Next.js の開発元である [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) を使うことです。

詳しくは [Next.js のデプロイドキュメント](https://nextjs.org/docs/app/building-your-application/deploying) を参照してください。
