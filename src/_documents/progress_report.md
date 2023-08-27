## 進捗報告

### 技術スタック

- フレームワーク: [Next.js](https://nextjs.org/)
- スタイリング: [Tailwind CSS](https://tailwindcss.com/)
- ORM: [Prisma](https://www.prisma.io/)
- BaaS: [Supabase](https://supabase.io/)
- UI コンポーネント: [shadcn/ui](https://ui.shadcn.com/)


### 主な進捗

- 管理画面の実装
  - シェフの作成・編集・削除
  - シェフのレシピの作成・編集・削除
  - table は[ shadcn/ui の Table コンポーネント](https://ui.shadcn.com/docs/components/table)を使用


- レシピカードの無限スクロール
  - Server Actions で jsxを返すことで実現
- フォロー・アンフォロー & レシピのお気に入り追加・削除で楽観的更新
  - [useOptimistic](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions#enhancements)を使用

- 自分メモのUI・機能実装
  - [react-textarea-autosize](https://www.npmjs.com/package/react-textarea-autosize)を使用