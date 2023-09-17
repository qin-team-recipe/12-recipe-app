"use client";

import { useState } from "react";

import Image from "@tiptap/extension-image";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ChevronDown, ChevronUp, MoreVertical, Pencil, Trash } from "lucide-react";
import { Drawer } from "vaul";

import { Command, CommandItem, CommandList, CommandSeparator } from "@/src/components/ui/command";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";

import { useWindowSize } from "../hooks/useWindowSize";
import InstructionEditor from "./instruction-editor";

type Props = {
  stepOrder: number;
  index: number;
  watchedValues: any;
  instructionsFields: any;
  removeInstructions: any;
  form: any;
  fieldValue: string;
};

const InstructionMenu = ({
  stepOrder,
  index,
  watchedValues,
  instructionsFields,
  removeInstructions,
  form,
  fieldValue,
}: Props) => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);

  const { isMobile } = useWindowSize();

  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "min-h-[80px] w-full rounded-md rounded-br-none rounded-bl-none border border-input bg-transparent px-3 py-2 border-b-0 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
      },
    },
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
      }),
      Image,
    ],
    content: fieldValue,
  });

  const handleDialogClose = () => {
    const json = editor?.getJSON();
    form.setValue(`instructions.${index}.value`, JSON.stringify(json));
    setIsOpenPopover(false);
  };

  return (
    <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
      <PopoverTrigger className="absolute right-6 top-1/2 -translate-y-1/2">
        <MoreVertical size={16} />
      </PopoverTrigger>
      <PopoverContent align="end" className="p-2">
        <Command className="w-full">
          <CommandList>
            <CommandItem className="text-mauve11">
              {isMobile ? (
                <Drawer.Root
                  shouldScaleBackground
                  onOpenChange={(isOpen) => {
                    if (!isOpen) {
                      handleDialogClose();
                    }
                  }}
                >
                  <Drawer.Trigger className="flex w-full">
                    <Pencil className="mr-2 h-4 w-4" />
                    <span>編集する</span>
                  </Drawer.Trigger>
                  <Drawer.Portal className="w-fit">
                    <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                    <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-[10px] bg-zinc-100 px-2">
                      <div className="flex-1 rounded-t-[10px] bg-white p-4">
                        <div className="mx-auto mb-8 h-1.5 w-12 shrink-0 rounded-full bg-mauve6" />
                        <div className="p-4">
                          <Drawer.Title className="mb-4 flex justify-between text-2xl">
                            <h2>作り方 {stepOrder}</h2>
                          </Drawer.Title>
                          <InstructionEditor editor={editor} />
                        </div>
                      </div>
                    </Drawer.Content>
                  </Drawer.Portal>
                </Drawer.Root>
              ) : (
                <Dialog
                  onOpenChange={(isOpen) => {
                    if (!isOpen) {
                      handleDialogClose();
                    }
                  }}
                >
                  <DialogTrigger className="flex w-full">
                    <Pencil className="mr-2 h-4 w-4" />
                    <span>編集する</span>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                      <DialogTitle className="flex justify-between">
                        <h2 className="text-xl">作り方 {stepOrder}</h2>
                      </DialogTitle>
                    </DialogHeader>
                    <InstructionEditor editor={editor} />
                  </DialogContent>
                </Dialog>
              )}
            </CommandItem>
            {index !== 0 && (
              <CommandItem className="text-mauve11">
                <MoveInstructionButton direction="up" index={index} watchedValues={watchedValues} form={form} />
              </CommandItem>
            )}
            {index !== instructionsFields.length - 1 && (
              <CommandItem className="text-mauve11">
                <MoveInstructionButton direction="down" index={index} watchedValues={watchedValues} form={form} />
              </CommandItem>
            )}
            <CommandSeparator />
            <CommandItem className="text-mauve11">
              <button
                disabled={instructionsFields.length === 1}
                className="flex w-full"
                onClick={() => {
                  removeInstructions(index);
                }}
              >
                <Trash className="mr-2 h-4 w-4" />
                <span>リストから削除する</span>
              </button>
            </CommandItem>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default InstructionMenu;

const MoveInstructionButton = ({
  direction,
  index,
  watchedValues,
  form,
}: {
  direction: "up" | "down";
  index: number;
  watchedValues: any;
  form: any;
}) => {
  const moveInstruction = () => {
    const instructions = [...watchedValues.instructions];
    const target = instructions[index];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    instructions[index].order = newIndex + 1;
    instructions[newIndex].order = index + 1;

    instructions[index] = instructions[newIndex];
    instructions[newIndex] = target;

    form.setValue("instructions", instructions);
  };

  return (
    <button className="flex w-full" onClick={moveInstruction}>
      {direction === "up" ? <ChevronUp className="mr-2 h-4 w-4" /> : <ChevronDown className="mr-2 h-4 w-4" />}
      <span>{direction === "up" ? "上に移動する" : "下に移動する"}</span>
    </button>
  );
};
