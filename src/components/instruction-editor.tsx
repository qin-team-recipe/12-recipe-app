"use client";

import { useCallback } from "react";

import { EditorContent, type Editor } from "@tiptap/react";
import { Bold, Italic, List, ListOrdered, Strikethrough, Image as TiptapImage } from "lucide-react";

import { Separator } from "./ui/separator";
import { Toggle } from "./ui/toggle";

type Props = {
  editor: Editor | null;
};

const InstructionEditor = ({ editor }: Props) => {
  return (
    <div className="flex flex-col space-y-0">
      <EditorContent editor={editor} className="mb-0" />
      {editor ? <RichTextEditorToolbar editor={editor} /> : null}
    </div>
  );
};

const RichTextEditorToolbar = ({ editor }: { editor: Editor }) => {
  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const image = new Image();
          image.src = e.target?.result as string;
          image.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = 100;
            canvas.height = 100;
            ctx?.drawImage(image, 0, 0, 100, 100);

            const src = canvas.toDataURL(file.type);
            editor.chain().focus().setImage({ src }).run();
          };
        };
        reader.readAsDataURL(file);
      }
    },
    [editor]
  );

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-row items-center gap-1 rounded-b-md border border-input bg-transparent p-1">
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={16} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={16} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough size={16} />
      </Toggle>
      <Separator orientation="vertical" className="h-8 w-[1px]" />
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={16} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={16} />
      </Toggle>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        id="imageUpload"
      />
      <label htmlFor="imageUpload" className="cursor-pointer">
        <TiptapImage size={16} />
      </label>
    </div>
  );
};

export default InstructionEditor;
