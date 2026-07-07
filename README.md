# my-photo-gallery

猫ちゃんの写真を一覧表示するギャラリーアプリです。グリッド表示、拡大表示、アップロード（ブラウザ内のみ、リロードで消える）に対応しています。

## 技術スタック

- Next.js 16 (App Router)
- React 19
- TypeScript
- styled-components

## ディレクトリ構成

```
src/
├── app/                    # ルーティング・レイアウト
│   ├── layout.tsx
│   ├── page.tsx            # 状態管理とコンポーネント組み立て
│   └── globals.css
├── components/
│   ├── gallery/            # ギャラリー関連 UI
│   └── modals/             # モーダル UI
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

[http://localhost:3000](http://localhost:3000) を開いて確認できます。

主な編集ポイント:

- ページの状態管理: `src/app/page.tsx`
- ギャラリー UI: `src/components/gallery/`
- モーダル UI: `src/components/modals/`
- 初期データ: `src/data/initialPhotos.ts`

## Scripts

```bash
npm run dev     # 開発サーバー
npm run build   # 本番ビルド
npm run start   # 本番サーバー
npm run lint    # ESLint
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
