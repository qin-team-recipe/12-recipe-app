import { useState } from "react";

import { Command, CommandItem, CommandList, CommandSeparator } from "@/src/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { ContentState, convertToRaw, EditorState, RichUtils } from "draft-js";
import { BoldIcon, ChevronDown, ChevronUp, List, ListOrdered, MoreVertical, Pencil, Trash, X } from "lucide-react";
import { Drawer } from "vaul";

import "@draft-js-plugins/image/lib/plugin.css";

import { cn } from "@/src/lib/utils";

import InstructionEditor from "./instruction-editor";
import { Button } from "./ui/button";

type Props = {
  stepOrder: number;
  index: number;
  watchedValues: any;
  instructionsFields: any;
  removeInstructions: any;
  form: any;
  value: any;
};

const InstructionMenu = ({
  stepOrder,
  index,
  watchedValues,
  instructionsFields,
  removeInstructions,
  form,
  value,
}: Props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText(value))
  );
  const [isOpenPopover, setIsOpenPopover] = useState(false);

  const toggleBold = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const toggleUnorderedList = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, "unordered-list-item"));
  };

  const toggleOrderedList = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, "ordered-list-item"));
  };

  const onChange = (value: EditorState) => {
    setEditorState(value);
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
              <Drawer.Root
                shouldScaleBackground
                onOpenChange={(isOpen) => {
                  if (!isOpen) {
                    form.setValue(
                      `instructions.${index}.value`,
                      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
                    );
                    setIsOpenPopover(false);
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
                          <div className="flex items-center">
                            {/* 太字 */}
                            <Button
                              variant={"outline"}
                              type="button"
                              className={cn(
                                editorState.getCurrentInlineStyle().has("BOLD") ? "bg-zinc-100" : "bg-white"
                              )}
                              onClick={toggleBold}
                            >
                              <BoldIcon size={12} />
                            </Button>
                            {/* 箇条書き */}
                            <Button
                              variant={"outline"}
                              type="button"
                              className={cn(
                                RichUtils.getCurrentBlockType(editorState) === "unordered-list-item"
                                  ? "bg-zinc-100"
                                  : "bg-white"
                              )}
                              onClick={toggleUnorderedList}
                            >
                              <List size={12} />
                            </Button>
                            {/* 順序付きリスト */}
                            <Button
                              variant={"outline"}
                              type="button"
                              className={cn(
                                RichUtils.getCurrentBlockType(editorState) === "ordered-list-item"
                                  ? "bg-zinc-100"
                                  : "bg-white"
                              )}
                              onClick={toggleOrderedList}
                            >
                              <ListOrdered size={12} />
                            </Button>
                          </div>
                        </Drawer.Title>
                        <InstructionEditor {...{ editorState, onChange, setEditorState }} />
                      </div>
                    </div>
                  </Drawer.Content>
                </Drawer.Portal>
              </Drawer.Root>
            </CommandItem>
            {index !== 0 && (
              <CommandItem className="text-mauve11">
                <button
                  className="flex"
                  onClick={() => {
                    const instructions = [...watchedValues.instructions];
                    const target = instructions[index];

                    // orderの更新
                    instructions[index].order = stepOrder - 1;
                    instructions[index - 1].order = stepOrder;

                    instructions[index] = instructions[index - 1];
                    instructions[index - 1] = target;

                    form.setValue("instructions", instructions);
                  }}
                >
                  <ChevronUp className="mr-2 h-4 w-4" />
                  <span>上に移動する</span>
                </button>
              </CommandItem>
            )}
            {index !== instructionsFields.length - 1 && (
              <CommandItem className="text-mauve11">
                <button
                  className="flex"
                  onClick={() => {
                    const instructions = [...watchedValues.instructions];
                    const target = instructions[index];

                    // orderの更新
                    instructions[index].order = stepOrder + 1;
                    instructions[index + 1].order = stepOrder;

                    instructions[index] = instructions[index + 1];
                    instructions[index + 1] = target;

                    form.setValue("instructions", instructions);
                  }}
                >
                  <ChevronDown className="mr-2 h-4 w-4" />
                  <span>下に移動する</span>
                </button>
              </CommandItem>
            )}
            <CommandSeparator />
            <CommandItem className="text-mauve11">
              <button
                disabled={instructionsFields.length === 1}
                className="flex"
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
