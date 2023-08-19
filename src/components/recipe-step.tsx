"use client";

import Editor from "@draft-js-plugins/editor";
import { ContentBlock, convertFromRaw, EditorState } from "draft-js";
import { Drawer } from "vaul";

type Props = {
  instruction: any;
  stepNumber: number;
};

export const RecipeStep = ({ instruction, stepNumber }: Props) => {
  const contentState = convertFromRaw(JSON.parse(instruction));
  const editorState = EditorState.createWithContent(contentState);

  const formatJSONDisplay = (jsonString: any) => {
    if (!jsonString) {
      return "";
    }

    const parsedData = JSON.parse(jsonString);
    const blocks = parsedData.blocks;

    let displayText = "";

    for (const block of blocks) {
      if (block.text) {
        switch (block.type) {
          case "unstyled":
            displayText += block.text + "\n";
            break;
          case "unordered-list-item":
            displayText += "• " + block.text + "\n";
            break;
          case "ordered-list-item":
            displayText += `${block.data?.index ? block.data.index + 1 : ""}. ` + block.text + "\n";
            break;
          default:
            displayText += block.text + "\n";
            break;
        }
      }
    }

    return displayText.trim();
  };

  return (
    <div className="flex items-start gap-x-2 border-y p-2">
      <span className="mt-px flex h-5 w-5 shrink-0 select-none items-center justify-center rounded-full bg-tomato9 text-sm text-mauve1">
        {stepNumber}
      </span>
      <Drawer.Root shouldScaleBackground>
        <Drawer.Trigger>
          <div className="line-clamp-3 flex-1 leading-snug text-mauve12">{formatJSONDisplay(instruction)}</div>
        </Drawer.Trigger>
        <Drawer.Portal className="w-fit">
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-[10px] bg-mauve1 px-2">
            <div className="flex-1 rounded-t-[10px] bg-white p-4">
              <div className="mx-auto mb-8 h-1.5 w-12 shrink-0 rounded-full bg-zinc-300" />
              <div className="p-4">
                <Drawer.Title className="mb-4 text-2xl">
                  <h2>作り方 {stepNumber}</h2>
                </Drawer.Title>
                <Editor
                  editorState={editorState}
                  readOnly
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
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};
