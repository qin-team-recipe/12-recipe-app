# ディレクトリ

## 概要
チーム12のディレクトリ構成及び説明を記載したもの。
ここの説明に沿って、ファイルの作成を行う。
<br>場合によって、加筆・修正あり。

## ディレクトリ構成
- `src`
  - `__documents`
  - `app`
    - `url名`
      - `__components`
      - `__constants`
      - `__hooks`
      - `__utils`
      - `layout.tsx`
      - `pages.tsx`
  - `components`
    - `ui`
      - `shadcn uiファイル`
    - `moleculesレベルの全体共通コンポーネント`
  - `config`
  - `constants`
  - `lib`
  - `prisma`
  - `supabase`
  - `types`

## ディレクトリ構成説明
|  ファイル名  | 説明 | 備考 |
| :------: | :---- | :---- |
|__documents|コード規約やGit運用などのチームに係るドキュメントを纏めた`.md`ファイルを置く場所||
|app|App Routerで使用するルーティングファイル置き場所<br>`url名`フォルダを作成しその中に`pages.tsx`ファイルなどを作成<br>Collocationの考え方を採用しているので、このページでしか使用しない定数などはprefixにアンダーバー`__`をつけたフォルダを作成する|`layout.tsx`や`page.tsx`以外のファイル説明は[こちら](https://nextjs.org/docs/app/building-your-application/routing#file-conventions)を参照|
|components|全体・複数箇所で使用されるUIコンポーネントファイルを置く場所<br>`ui`直下は基本的に`shadcn add [コンポーネント名]`コマンドで作成されたファイルが対象||
|config|ページの設定などのファイルを置く場所||
|constants|全体・複数箇所で使用される定数ファイルを置く場所||
|lib|`supabase`や`prisma`などの初期設定ファイルを置く場所||
|prisma|`prisma`コマンドで作成されたファイルを置く場所<br>基本ここに手動で追加するファイルはないので触らないこと||
|supabase|`sql`文などのファイルを置く場所||
|types|全体的・複数で使用する型定義ファイルを置く場所||

