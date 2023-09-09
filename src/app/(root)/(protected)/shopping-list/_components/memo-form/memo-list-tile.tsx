import { useCallback, useEffect, useRef, useState } from "react";

import { deleteMemoById } from "@/src/actions/deleteMemoById";
import { patchMemoCompleteStatus } from "@/src/actions/patchMemoCompleteStatus";
import { patchMemoTitle } from "@/src/actions/patchMemoTitle";
import { putMemoOrder } from "@/src/actions/putMemoOrder";
import { kToastDuration } from "@/src/constants/constants";
import { Check, ChevronDown, ChevronUp, MoreVertical, Trash } from "lucide-react";
import { UseFieldArrayRemove, UseFormReturn } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

import { Command, CommandItem, CommandList, CommandSeparator } from "@/src/components/ui/command";
import { FormControl, FormField, FormItem } from "@/src/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { useToast } from "@/src/components/ui/use-toast";

import { MemoFormValues } from ".";
import { cn } from "../../../../../../lib/utils";

type Props = {
  form: UseFormReturn<MemoFormValues>;
  index: number;
  remove: UseFieldArrayRemove;
};

export const MemoListTile = ({ form, index, remove }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState<number | null>(null);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isOpenPopover, setIsOpenPopover] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleHeightChange = useCallback(
    (height: number) => {
      if (isEditing || isInitialRender) {
        setTextareaHeight(height);
        setIsInitialRender(false);
      }
    },
    [isEditing, isInitialRender]
  );

  const handleTextareaFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    if (textarea.value.length > 0) {
      const length = textarea.value.length;
      textarea.selectionStart = length;
      textarea.selectionEnd = length;
    }
  };

  const currentMemo = form.getValues(`memo.${index}`);

  const handleEditTitle = useCallback(async () => {
    setIsEditing(false);
    await patchMemoTitle(currentMemo.id, currentMemo.text);
  }, [currentMemo]);

  const { toast } = useToast();

  const isChecked = form.getValues(`memo.${index}.isCompleted`);

  const handleToggleCompletion = useCallback(async () => {
    const memoId = form.getValues(`memo.${index}.id`);
    const result = await patchMemoCompleteStatus(memoId, isChecked);
    if (result.isSuccess) {
      form.setValue(`memo.${index}.isCompleted`, !isChecked);
    } else {
      toast({
        variant: "destructive",
        title: result.error,
        duration: kToastDuration,
      });
    }
    setIsOpenPopover(false);
  }, [form, index, isChecked, toast]);

  const handleMoveDown = useCallback(async () => {
    const memos = form.getValues("memo");
    const target = memos[index];
    const nextMemo = memos[index + 1];

    if (!target?.order || !nextMemo?.order) {
      return;
    }

    // orderの更新
    const tempOrder = target.order;
    target.order = nextMemo.order;
    nextMemo.order = tempOrder;

    memos[index] = nextMemo;
    memos[index + 1] = target;

    form.setValue("memo", memos);

    const nextMemoId = form.getValues(`memo.${index + 1}.id`);
    const currentMemoId = form.getValues(`memo.${index}.id`);

    const result = await putMemoOrder({
      sourceMemoId: nextMemoId,
      targetMemoId: currentMemoId,
    });

    if (!result.isSuccess) {
      toast({
        variant: "destructive",
        title: result.error,
        duration: kToastDuration,
      });
    }

    setIsOpenPopover(false);
  }, [form, index, toast]);

  const handleDelete = useCallback(async () => {
    const result = await deleteMemoById(form.getValues(`memo.${index}.id`));
    if (result.isSuccess) {
      remove(index);

      // 削除した要素のあとの要素のorderを更新する
      const memos = form.getValues("memo");
      for (let i = index; i < memos.length; i++) {
        memos[i].order = i + 1;
      }
      form.setValue("memo", memos);
    } else {
      toast({
        variant: "destructive",
        title: result.error,
        duration: kToastDuration,
      });
    }

    setIsOpenPopover(false);
  }, [form, index, remove, toast]);

  const handleMoveUp = useCallback(async () => {
    const memos = form.getValues("memo");
    const target = memos[index];
    const prevMemo = memos[index - 1];

    if (!target?.order || !prevMemo?.order) {
      return;
    }

    // orderの更新
    const tempOrder = target.order;
    target.order = prevMemo.order;
    prevMemo.order = tempOrder;

    memos[index] = prevMemo;
    memos[index - 1] = target;

    form.setValue("memo", memos);

    const prevMemoId = form.getValues(`memo.${index - 1}.id`);
    const currentMemoId = form.getValues(`memo.${index}.id`);

    const result = await putMemoOrder({
      sourceMemoId: prevMemoId,
      targetMemoId: currentMemoId,
    });

    if (!result.isSuccess) {
      toast({
        variant: "destructive",
        title: result.error,
        duration: kToastDuration,
      });
    }

    setIsOpenPopover(false);
  }, [form, index, toast]);

  useEffect(() => {
    if (isEditing && textareaRef?.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  return (
    <FormField
      control={form.control}
      name={`memo.${index}.text`}
      render={({ field }) => (
        <FormItem className="border-y">
          <FormControl>
            <div className="relative flex-1">
              <button
                type="button"
                onClick={handleToggleCompletion}
                aria-label={isChecked ? "Uncheck item" : "Check item"}
                className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2",
                  isChecked
                    ? "flex h-5 w-5 items-center justify-center rounded-full border-mauve1 bg-mauve8 p-1 text-mauve1"
                    : "h-5 w-5 rounded-full border-2 border-tomato9 p-1"
                )}
              >
                {isChecked && <Check />}
              </button>
              {isEditing || isInitialRender ? (
                <TextareaAutosize
                  {...field}
                  minRows={1}
                  ref={textareaRef}
                  value={field.value}
                  onFocus={handleTextareaFocus}
                  onBlur={handleEditTitle}
                  onHeightChange={handleHeightChange}
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                    form.setValue(`memo.${index}.text`, event.target.value);
                  }}
                  onKeyDown={async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      await handleEditTitle();
                    }
                  }}
                  autoFocus
                  className={cn(
                    "flex w-full rounded-md border border-input bg-transparent px-12 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                    isInitialRender && "opacity-0"
                  )}
                />
              ) : (
                <p
                  onClick={
                    !isEditing
                      ? () => {
                          setIsEditing(true);
                        }
                      : undefined
                  }
                  className={cn(
                    "flex w-full overflow-hidden text-ellipsis rounded-md bg-transparent px-12 py-2 text-sm text-mauve12 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground",
                    isChecked && "text-mauve8"
                  )}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: textareaHeight || "2.5rem",
                  }}
                >
                  {field.value}
                </p>
              )}
              <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
                <PopoverTrigger className="absolute right-4 top-1/2 -translate-y-1/2">
                  <MoreVertical size={16} />
                </PopoverTrigger>
                <PopoverContent align="end" className="p-2">
                  <Command className="w-full">
                    <CommandList>
                      {index !== 0 && (
                        <CommandItem className="text-mauve11">
                          <button className="flex w-full" onClick={handleMoveUp}>
                            <ChevronUp className="mr-2 h-4 w-4" />
                            <span>上に移動する</span>
                          </button>
                        </CommandItem>
                      )}
                      {index !== form.getValues("memo").length - 1 && (
                        <CommandItem className="text-mauve11">
                          <button className="flex w-full" onClick={handleMoveDown}>
                            <ChevronDown className="mr-2 h-4 w-4" />
                            <span>下に移動する</span>
                          </button>
                        </CommandItem>
                      )}
                      <CommandSeparator />
                      <CommandItem className="text-mauve11">
                        <button className="flex w-full" onClick={handleDelete}>
                          <Trash className="mr-2 h-4 w-4" />
                          <span>リストから削除する</span>
                        </button>
                      </CommandItem>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
