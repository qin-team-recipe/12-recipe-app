"use client";

import { useCallback, useState } from "react";

import { deleteMemoAll } from "@/src/actions/deleteMemoAll";
import { deleteMemoCompleted } from "@/src/actions/deleteMemoCompleted";
import { postMemo } from "@/src/actions/postMemo";
import { MemoListTile } from "@/src/app/(root)/shopping/_components/memo-form/memo-list-tile";
import { Command, CommandItem, CommandList } from "@/src/components/ui/command";
import { Form } from "@/src/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { useToast } from "@/src/components/ui/use-toast";
import { kToastDuration } from "@/src/constants/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2Icon, CircleEllipsis, PlusIcon, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

import { memoFormSchema, MemoFormValues } from "./schema";

type Props = {
  defaultValues: Partial<MemoFormValues>;
};

const MemoForm = ({ defaultValues }: Props) => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);

  const form = useForm<MemoFormValues>({
    resolver: zodResolver(memoFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  const { toast } = useToast();

  const watchedValues = form.watch("memo");

  const { fields, append, remove, update } = useFieldArray({
    name: "memo",
    control: form.control,
  });

  const handleAddMemo = useCallback(async () => {
    const lastMemoIndex = watchedValues.length - 1;
    const lastMemo = form.getValues("memo")[lastMemoIndex];
    if (lastMemo && !lastMemo.text) {
      toast({
        variant: "destructive",
        title: "メモを入力してください",
        duration: kToastDuration,
      });
    } else {
      const result = await postMemo();
      if (result.isSuccess) {
        append({
          text: "",
          order: watchedValues.length + 1,
          id: result.id!,
          isCompleted: false,
        });
      } else {
        toast({
          variant: "destructive",
          title: result.error,
          duration: kToastDuration,
        });
      }
    }
  }, [watchedValues, form, toast, append]);

  const handleDeleteCompletedMemos = useCallback(async () => {
    const result = await deleteMemoCompleted();
    if (result.isSuccess) {
      const completedIndices = form
        .getValues("memo")
        .map((memo, index) => (memo.isCompleted ? index : -1))
        .filter((index) => index !== -1);
      for (let i = completedIndices.length - 1; i >= 0; i--) {
        remove(completedIndices[i]);
      }
      const remainingMemos = form.getValues("memo").filter((memo) => !memo.isCompleted);
      for (let i = 0; i < remainingMemos.length; i++) {
        update(i, { ...remainingMemos[i], order: i + 1 });
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

  const handleDeleteAllMemos = useCallback(async () => {
    const result = await deleteMemoAll();
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
  }, [toast, remove]);

  return (
    <>
      <div className="mb-3 flex items-center justify-between px-4">
        <h2 className="text-lg font-bold">自分メモ</h2>
        <div className="flex gap-4">
          <button onClick={handleAddMemo}>
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
                      disabled={{ memo: form.getValues("memo") }.memo.find((memo) => memo.isCompleted) === undefined}
                      onClick={handleDeleteCompletedMemos}
                    >
                      <CheckCircle2Icon className="mr-2 h-4 w-4" />
                      <span>完了したアイテムだけ削除する</span>
                    </button>
                  </CommandItem>
                  <CommandItem>
                    <button
                      className="flex w-full"
                      disabled={watchedValues.length === 0}
                      onClick={handleDeleteAllMemos}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>全てのアイテムを削除する</span>
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
            <MemoListTile form={form} index={index} key={field.id} remove={remove} />
          ))}
        </form>
      </Form>
    </>
  );
};

export default MemoForm;
