# 12-recipe-app

## 開発環境

volta をインストールする。

```bash
# Linux and macOS (Bash)
curl https://get.volta.sh | bash
# macOS (Homebrew)
brew install volta

# Windows
choco install volta
# or
scoop install volta
# or
Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.volta.sh')
# or
iwr https://get.volta.sh | iex
```

Node.js をインストールする。

```bash
volta install node
```

pnpm で依存パッケージをインストールする。

```bash
pnpm install
```

開発サーバーを起動する。

```bash
pnpm dev
```

## 開発ガイドライン

- [Git 開発ルール](src/_documents/git_development_rule.md)
- [コード規約](src/_documents/coding_guideline.md)
- [カラー定義](src/_documents/color_definition.md)
- [ディレクトリ構成](src/_documents/directory_structure.md)
