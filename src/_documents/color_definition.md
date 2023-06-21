# shadcn-plugin の設定

### [shadcn-plugin](../lib/shadcn-plugin.ts) の色設定一覧

figma からカラーを取得して、shadcn-plugin に指定した`tomato`や`mauve`などの色を取得します。

![Monosnap 一流レシピ 2023-06-22 00-10-39](https://github.com/qin-team-recipe/12-recipe-app/assets/63396451/1a02e86f-a178-49b5-97c4-31f2a1e941d5)


<details>
<summary>
   <strong>shadcn/uiのカラー設定一覧（基本使用しない方針）</strong>
</summary>

1. **--background** と **--foreground**  
   これらは、一般的な背景色と前景色（通常はテキスト）を定義します。これらの色は、ページ全体の主要な配色を決定します。

2. **--muted** と **--muted-foreground**  
   これらの色は、より弱い、控えめな配色が必要な場合に使用します。例えば、説明テキストやヘルプテキストなど、重要性が低い情報に使われます。

3. **--popover** と **--popover-foreground**  
   これらの色は、ポップオーバー（ユーザがアクションを起こしたときに表示される小さなウィンドウ）の背景色と前景色を定義します。

4. **--card** と **--card-foreground**  
   これらの色は、カード型の UI コンポーネントの背景色と前景色を定義します。カードは一般的に、関連する情報やアクションをグループ化して表示するために使用されます。

5. **--border** と **--input**  
   --border はボーダーカラーを定義し、--input は入力フィールドの色を定義します。

6. **--primary** と **--primary-foreground**  
   これらの色は、ウェブサイトの主要なアクションや情報に使われます。例えば、フォームの送信ボタンや、重要なテキストに使います。

7. **--secondary** と **--secondary-foreground**  
   これらの色は、ウェブサイトの二次的なアクションや情報に使われます。例えば、キャンセルボタンや、一部の情報テキストに使います。

8. **--accent** と **--accent-foreground**  
   アクセントカラーは、特定の要素を強調するために使います。これはユーザーの注意を引くための色で、ボタンやリンク、重要なテキストなどに使われます。

9. **--destructive** と **--destructive-foreground**  
   これらの色は、ユーザーが何かを削除したり、重要な変更を行うようなアクションを表すときに使います。

10. **--ring**  
    一般的に、要素にフォーカスがあたったときの色を定義します。フォームフィールドやボタンなど、ユーザーが直接対話する要素に使われます。

</details>

---

### 参考

- [Radix Colors](https://www.radix-ui.com/docs/colors/palette-composition/the-scales)
- [Tailwind CSS を使った ダークモード実装の効率的なアプローチ](https://zenn.dev/deer/articles/d3b104ac97711d)
