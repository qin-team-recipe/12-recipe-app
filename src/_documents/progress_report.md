## 進捗報告

### 技術スタック

- フレームワーク: [Next.js](https://nextjs.org/)
- スタイリング: [Tailwind CSS](https://tailwindcss.com/)
- ORM: [Prisma](https://www.prisma.io/)
- BaaS: [Supabase](https://supabase.io/)
- UI コンポーネント: [shadcn/ui](https://ui.shadcn.com/)


### 9月の主な進捗

- 認証周り
  - OAuth(Github)での認証
  - `admin` パスへは管理者権限をもつユーザーのみアクセス可能
  - `Parallel Routes` による条件付きルーティングを実装
  - `Route Handlers`を利用して、ログアウト・退会処理を実装

<img width="351" alt="スクリーンショット 2023-09-30 13 19 04" src="https://github.com/qin-team-recipe/12-recipe-app/assets/63396451/a437c7ac-2d81-42e8-9f3c-4b0ef2f05e9e">

---

- 画像周り
  - プロフィール・レシピ・シェフの画像をアップロード対応
  - Blur 効果を利用した画像のローディング
    - Imageコンポーネントの`onLoadingComplete`プロパティを使用
    - Imageコンポーネントの`onError`プロパティを使用して、画像のロードに失敗したときのエラーハンドリングも対応
  - レシピ画像にはクロッピング機能を実装
    - [react-cropper](https://www.npmjs.com/package/react-cropper)を利用
 
https://github.com/qin-team-recipe/12-recipe-app/assets/63396451/6f6c7690-76ff-404a-a8d0-d772359d8f96

---

- その他
  - リッチテキストエディタのリファクタ( [tiptap](https://www.npmjs.com/package/@tiptap/react) を利用)

