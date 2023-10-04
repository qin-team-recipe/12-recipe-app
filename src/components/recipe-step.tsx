"use client";

import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Drawer } from "vaul";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";

import { useWindowSize } from "../hooks/useWindowSize";

type Props = {
  instruction: any;
  stepNumber: number;
};

export const RecipeStep = ({ instruction, stepNumber }: Props) => {
  const { isMobile } = useWindowSize();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // 箇条書き
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
        // 番号付き箇条書き
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
      }),
      Image,
    ],
    content: JSON.parse(instruction),
    editable: false,
  });

  return (
    <div className="flex items-start gap-x-2 border-y p-2">
      <span className="mt-px flex h-5 w-5 shrink-0 select-none items-center justify-center rounded-full bg-tomato9 text-sm text-mauve1">
        {stepNumber}
      </span>
      {isMobile ? (
        <Drawer.Root shouldScaleBackground>
          <Drawer.Trigger className="w-full">
            <div className="line-clamp-3 flex-1 text-left leading-snug text-mauve12">{editor?.getText()}</div>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-[10px] bg-mauve1 px-2">
              <div className="flex-1 rounded-t-[10px] bg-white p-4">
                <div className="mx-auto mb-8 h-1.5 w-12 shrink-0 rounded-full bg-zinc-300" />
                <div className="p-2">
                  <Drawer.Title className="mb-4 text-2xl">
                    <h2>作り方 {stepNumber}</h2>
                  </Drawer.Title>
                  <EditorContent editor={editor} readOnly={true} />
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      ) : (
        <Dialog>
          <DialogTrigger className="w-full">
            <button className="line-clamp-3 w-full flex-1 text-left leading-snug text-mauve12">
              {editor?.getText()}
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[424px]">
            <DialogHeader>
              <DialogTitle className="text-xl">
                <h2>作り方 {stepNumber}</h2>
              </DialogTitle>
              <EditorContent className="p-4" editor={editor} readOnly={true} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
