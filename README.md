# 12-recipe-app

## はじめに

環境構築は以下のコマンドで行う。

```bash
pnpm install
```

開発サーバーを起動する。

```bash

pnpm dev
```

## ブランチ名

`prefix/Issue番号/作業名(スネークケース)`のように、スラッシュ区切りで名前を付ける。

prefix には後述のコミットメッセージの prefix を用いる。
例えば Issue 番号 34 番の退会機能を実装する時は、`feat/34/delete_account`のようにする。

## コミットメッセージ

Angular.js の開発者ガイドラインに書いてあるルールに従う。

作業内容に応じて、次の prefix: をコミットメッセージの頭に付ける。
例えばメールアドレス認証のバグ修正をした時は、`🐛 メールアドレス認証時に~が~になるバグ修正`など。
また、日本語のコミットメッセージの末尾には句点を付けない。

- OK: `🐛 メールアドレス認証のバグ修正`
- NG: `🐛 メールアドレス認証のバグ修正。`

<https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#type>

> feat: 機能追加
> fix: バグ修正
> docs: ドキュメントのみの更新
> style: コードの意味に影響を与えない変更(空白削除、コードフォーマット、セミコロン追加など)
> refactor: リファクタリング(バグ修正でも機能追加でもないコード変更)
> perf: パフォーマンスを向上させるコード変更
> test: 不足しているテストの追加や既存のテストの修正
> chore: ビルドプロセス、またはドキュメント生成などの補助ツールやライブラリの変更

prefix には[gitmoji](https://marketplace.visualstudio.com/items?itemName=seatonjiang.gitmoji-vscode)を用いる。

|  prefix  | 絵文字 |
| :------: | :----: |
|   feat   |   ✨   |
|   fix    |   🐛   |
|   docs   |   📝   |
|  style   |   🎨   |
| refactor |   ♻️   |
|   pref   |  ⚡️   |
|   test   |   🧪   |
|  chore   |   👷   |
