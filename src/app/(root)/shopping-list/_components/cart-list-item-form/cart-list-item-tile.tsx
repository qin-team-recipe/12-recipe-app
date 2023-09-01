import { useCallback, useEffect, useState } from "react";

import { removeCartListItem } from "@/src/actions/cartListItemActions";
import { patchCartListItemCompleteStatus } from "@/src/actions/patchCartListItemCompleteStatus";
import { putCartListItemOrder } from "@/src/actions/putCartListItemOrder";
import { kToastDuration } from "@/src/constants/constants";
import useTileEditingState from "@/src/hooks/useTileEditingState";
import { Check, ChevronDown, ChevronUp, MoreVertical, Trash } from "lucide-react";
import { UseFieldArrayRemove, UseFormReturn } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

import { Command, CommandItem, CommandList, CommandSeparator } from "@/src/components/ui/command";
import { FormControl, FormField, FormItem } from "@/src/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { useToast } from "@/src/components/ui/use-toast";

import { cn } from "../../../../../lib/utils";
import { CartListItemFormValues } from "./schema";

type Props = {
  recipeId: string;
  form: UseFormReturn<CartListItemFormValues>;
  index: number;
  remove: UseFieldArrayRemove;
};

export const CartListItemTile = ({ recipeId, form, index, remove }: Props) => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);

  const {
    isEditing,
    setIsEditing,
    isInitialRender,
    textareaHeight,
    textareaRef,
    handleHeightChange,
    handleTextareaFocus,
    handleEditTitle,
  } = useTileEditingState(form, index);

  const { toast } = useToast();

  const isChecked = form.getValues(`cartListItem.${index}.isCompleted`);

  const handleToggleCompletion = useCallback(async () => {
    const cartListItemId = form.getValues(`cartListItem.${index}.id`);
    const result = await patchCartListItemCompleteStatus(cartListItemId, isChecked);
    if (result.isSuccess) {
      form.setValue(`cartListItem.${index}.isCompleted`, !isChecked);
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
    const cartListItems = form.getValues("cartListItem");
    const target = cartListItems[index];
    const nextCartListItem = cartListItems[index + 1];

    if (!target?.order || !nextCartListItem?.order) {
      return;
    }

    // orderの更新
    const tempOrder = target.order;
    target.order = nextCartListItem.order;
    nextCartListItem.order = tempOrder;

    cartListItems[index] = nextCartListItem;
    cartListItems[index + 1] = target;

    form.setValue("cartListItem", cartListItems);

    const nextCartListItemId = form.getValues(`cartListItem.${index + 1}.id`);
    const currentCartListItemId = form.getValues(`cartListItem.${index}.id`);

    const result = await putCartListItemOrder({
      sourceCartListItemId: nextCartListItemId,
      targetCartListItemId: currentCartListItemId,
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
    const result = await removeCartListItem(recipeId, form.getValues(`cartListItem.${index}.id`));
    if (result.isSuccess) {
      remove(index);

      // 削除した要素のあとの要素のorderを更新する
      const carts = form.getValues("cartListItem");
      for (let i = index; i < carts.length; i++) {
        carts[i].order = i + 1;
      }
      form.setValue("cartListItem", carts);
    } else {
      toast({
        variant: "destructive",
        title: result.error,
        duration: kToastDuration,
      });
    }

    setIsOpenPopover(false);
  }, [form, index, recipeId, remove, toast]);

  const handleMoveUp = useCallback(async () => {
    const cartListItems = form.getValues("cartListItem");
    const target = cartListItems[index];
    const prevCartListItem = cartListItems[index - 1];

    if (!target?.order || !prevCartListItem?.order) {
      return;
    }

    // orderの更新
    const tempOrder = target.order;
    target.order = prevCartListItem.order;
    prevCartListItem.order = tempOrder;

    cartListItems[index] = prevCartListItem;
    cartListItems[index - 1] = target;

    form.setValue("cartListItem", cartListItems);

    const prevCartListItemId = form.getValues(`cartListItem.${index - 1}.id`);
    const currentCartListItemId = form.getValues(`cartListItem.${index}.id`);

    const result = await putCartListItemOrder({
      sourceCartListItemId: prevCartListItemId,
      targetCartListItemId: currentCartListItemId,
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
  }, [isEditing, textareaRef]);

  return (
    <FormField
      control={form.control}
      name={`cartListItem.${index}.ingredient`}
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
                  disabled={!form.getValues(`cartListItem.${index}.isCustom`)}
                  ref={textareaRef}
                  value={field.value}
                  onFocus={handleTextareaFocus}
                  onBlur={handleEditTitle}
                  onHeightChange={handleHeightChange}
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                    form.setValue(`cartListItem.${index}.ingredient`, event.target.value);
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
                      {index !== form.getValues("cartListItem").length - 1 && (
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
