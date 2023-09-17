"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { deleteCartList } from "@/src/actions/deleteCartList";
import { deleteCartListItemCompleted } from "@/src/actions/deleteCartListItemCompleted";
import { postCartListItem } from "@/src/actions/postCartListItem";
import { putCartListDisplayOrder } from "@/src/actions/putCartListDisplayOrder";
import { kToastDuration } from "@/src/constants/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommandSeparator } from "cmdk";
import { CheckCircle2Icon, ChefHat, ChevronDown, ChevronUp, CircleEllipsis, PlusIcon, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

import { Command, CommandItem, CommandList } from "@/src/components/ui/command";
import { Form } from "@/src/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { useToast } from "@/src/components/ui/use-toast";

import { CartListItemTile } from "./cart-list-item-tile";
import { cartListItemFormSchema, CartListItemFormValues } from "./schema";

type Props = {
  defaultValues: Partial<CartListItemFormValues>;
  index: number;
  cartListId: number;
  recipe: {
    id: string;
    title: string;
  };
  cartListLength: number;
  displayOrder: number;
};

const CartListItemForm = ({ defaultValues, index, recipe, cartListId, cartListLength, displayOrder }: Props) => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);

  const router = useRouter();

  const form = useForm<CartListItemFormValues>({
    resolver: zodResolver(cartListItemFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  const { toast } = useToast();

  const watchedValues = form.watch("cartListItem");

  const { fields, append, remove, update } = useFieldArray({
    name: "cartListItem",
    control: form.control,
  });

  const handleAddCartListItem = useCallback(async () => {
    const lastCartListItemIndex = watchedValues.length - 1;
    const lastCartListItem = form.getValues("cartListItem")[lastCartListItemIndex];
    if (lastCartListItem && !lastCartListItem.ingredient) {
      toast({
        variant: "destructive",
        title: "材料を入力してください😡",
        duration: kToastDuration,
      });
    } else {
      const result = await postCartListItem(cartListId);
      if (result.isSuccess) {
        append({
          ingredient: "",
          order: watchedValues.length + 1,
          id: result.id!,
          isCompleted: false,
          isCustom: true,
        });
      } else {
        toast({
          variant: "destructive",
          title: result.error,
          duration: kToastDuration,
        });
      }
    }
  }, [watchedValues.length, form, toast, cartListId, append]);

  const handleDeleteCompletedCartListItems = useCallback(async () => {
    const result = await deleteCartListItemCompleted();
    if (result.isSuccess) {
      const completedIndices = form
        .getValues("cartListItem")
        .map((cart, index) => (cart.isCompleted ? index : -1))
        .filter((index) => index !== -1);
      for (let i = completedIndices.length - 1; i >= 0; i--) {
        remove(completedIndices[i]);
      }

      const remainingCartListItems = form.getValues("cartListItem").filter((cart) => !cart.isCompleted);
      for (let i = 0; i < remainingCartListItems.length; i++) {
        update(i, { ...remainingCartListItems[i], order: i + 1 });
      }
      toast({
        variant: "default",
        title: result.message,
        duration: kToastDuration,
      });
    } else {
      toast({
        variant: "destructive",
        title: result.error,
        duration: kToastDuration,
      });
    }
    setIsOpenPopover(false);
  }, [form, toast, remove, update]);

  const handleDeleteAllCartListItems = useCallback(async () => {
    const result = await deleteCartList(cartListId);
    if (result.isSuccess) {
      remove();

      toast({
        variant: "default",
        title: result.message,
        duration: kToastDuration,
      });
    } else {
      toast({
        variant: "destructive",
        title: result.error,
        duration: kToastDuration,
      });
    }
    setIsOpenPopover(false);
  }, [cartListId, remove, toast]);

  const handleMoveUp = useCallback(async () => {
    const result = await putCartListDisplayOrder({
      direction: "up",
      displayOrder,
    });

    if (!result.isSuccess) {
      toast({
        variant: "destructive",
        title: result.error,
        duration: kToastDuration,
      });
    }

    setIsOpenPopover(false);
  }, [displayOrder, toast]);

  const handleMoveDown = useCallback(async () => {
    const result = await putCartListDisplayOrder({
      direction: "down",
      displayOrder,
    });

    if (!result.isSuccess) {
      toast({
        variant: "destructive",
        title: result.error,
        duration: kToastDuration,
      });
    }

    setIsOpenPopover(false);
  }, [displayOrder, toast]);

  return (
    <>
      <div className="mb-3 flex items-center justify-between px-4">
        <h2 className="line-clamp-1 text-lg font-bold">{recipe.title}</h2>
        <div className="flex gap-4">
          <button onClick={handleAddCartListItem}>
            <PlusIcon size={20} />
          </button>
          <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
            <PopoverTrigger>
              <CircleEllipsis size={20} />
            </PopoverTrigger>
            <PopoverContent align="end" className="p-2">
              <Command className="w-full">
                <CommandList>
                  <CommandItem>
                    <button
                      className="flex w-full"
                      onClick={() => {
                        router.push(`/recipe/${recipe.id}`);
                      }}
                    >
                      <ChefHat className="mr-2 h-4 w-4" />
                      <span>レシピ詳細をみる</span>
                    </button>
                  </CommandItem>
                  {index !== 0 && (
                    <CommandItem className="text-mauve11">
                      <button className="flex w-full" onClick={handleMoveUp}>
                        <ChevronUp className="mr-2 h-4 w-4" />
                        <span>上に移動する</span>
                      </button>
                    </CommandItem>
                  )}
                  {index !== cartListLength - 1 && (
                    <CommandItem className="text-mauve11">
                      <button className="flex w-full" onClick={handleMoveDown}>
                        <ChevronDown className="mr-2 h-4 w-4" />
                        <span>下に移動する</span>
                      </button>
                    </CommandItem>
                  )}
                  <CommandSeparator />
                  <CommandItem>
                    <button
                      className="flex w-full"
                      disabled={
                        { cart: form.getValues("cartListItem") }.cart.find((cart) => cart.isCompleted) === undefined
                      }
                      onClick={handleDeleteCompletedCartListItems}
                    >
                      <CheckCircle2Icon className="mr-2 h-4 w-4" />
                      <span>完了したアイテムだけ削除する</span>
                    </button>
                  </CommandItem>
                  <CommandItem>
                    <button
                      className="flex w-full"
                      disabled={watchedValues.length === 0}
                      onClick={handleDeleteAllCartListItems}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>レシピを買い物リストから削除する</span>
                    </button>
                  </CommandItem>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Form {...form}>
        <form className="mb-8">
          {fields.map((field, index) => (
            <CartListItemTile cartListId={cartListId} form={form} index={index} key={field.id} remove={remove} />
          ))}
        </form>
      </Form>
    </>
  );
};

export default CartListItemForm;
