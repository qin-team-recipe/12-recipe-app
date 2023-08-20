"use client";

import { Dispatch, SetStateAction, useMemo } from "react";

import createLinkPlugin from "@draft-js-plugins/anchor";
import Editor from "@draft-js-plugins/editor";
import createImagePlugin from "@draft-js-plugins/image";
import { AtomicBlockUtils, ContentBlock, EditorState, RichUtils, SelectionState } from "draft-js";

type Props = {
  onChange: (value: EditorState) => void;
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
};

const InstructionEditor = ({ onChange, editorState, setEditorState }: Props) => {
  const [plugins, LinkButton] = useMemo(() => {
    const linkPlugin = createLinkPlugin({ placeholder: "http://..." });
    const imagePlugin = createImagePlugin();
    return [[linkPlugin, imagePlugin], linkPlugin.LinkButton];
  }, []);

  const handleKeyCommand = (command: any, editorState: any) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const insertImage = (url: string) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity("image", "IMMUTABLE", { src: url });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });

    handleEditorChange(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " "));
  };

  const handleDroppedFiles = (selection: SelectionState, files: Blob[]): any => {
    console.log("Dropped files:", files); // ドロップされたファイルのログを追加
    if (files.length > 0 && files[0].type.startsWith("image/")) {
      // サーバに保存する処理　画像のURLが戻される
      insertImage("logo192.png");
    }
  };

  const handleEditorChange = (newEditorState: EditorState) => {
    const currentContent = newEditorState.getCurrentContent();
    const plainText = currentContent.getPlainText();

    // 4連続改行を禁止
    const hasThreeConsecutiveNewlines = /(\n\s*){4,}/.test(plainText);

    if (!hasThreeConsecutiveNewlines) {
      setEditorState(newEditorState);
      onChange(newEditorState); // 親コンポーネントに変更を伝える
    }
  };

  return (
    <>
      <div className="rounded-md bg-mauve2 p-1">
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          handleKeyCommand={handleKeyCommand}
          handleDroppedFiles={handleDroppedFiles}
          plugins={plugins}
          blockStyleFn={(block: ContentBlock) => {
            switch (block.getType()) {
              case "unordered-list-item":
                return "list-disc";
              case "ordered-list-item":
                return "list-decimal";
              default:
                return "";
            }
          }}
        />
      </div>
    </>
  );
};

export default InstructionEditor;
