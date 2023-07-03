# コード規約

## UI コンポーネント

- UI コンポーネントは全て`パスカルケース`で記述する
- ファイル名は`ケバブケース`で記述する

```tsx
// 例
// ファイル名: sample-component.tsx
const SampleComponent = () => {
  return <div>SampleComponent</div>;
};
```

- 関数式コンポーネントを使用する
- エクスポートは`デフォルトエクスポート`で行う

```tsx
// 例
// ファイル名: sample-component.tsx
const SampleComponent = () => {
  return <div>SampleComponent</div>;
};

export default SampleComponent;
```

- Props は分割代入で受け取る

```tsx
// 例
// ファイル名: sample-component.tsx
type Props = {
  sampleProps: string;
};

const SampleComponent = ({ sampleProps }: Props) => {
  return <div>{sampleProps}</div>;
};

export default SampleComponent;
```

## API

- API メソッドは全て`キャメルケース`で記述する
- ファイル名も`キャメルケース`で記述する
- エクスポートは`名前付きエクスポート`で行う

```ts
// 例
// ファイル名: sampleApi.ts
export const sampleApi = () => {
  return "sample";
};
```

## スタイル

### tailwind.config.js

- スタイルのカスタマイズ（extend）の命名規約としてプレフィックス`extend-`を付ける

```js
// 例
// ファイル名: tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        "extend-primary": "#000000",
      },
    },
  },
};

// 使用例
// ファイル名: sample-component.tsx
const SampleComponent = () => {
  return (
    <div className="bg-extend-primary">
      <div>SampleComponent</div>
    </div>
  );
};
```
