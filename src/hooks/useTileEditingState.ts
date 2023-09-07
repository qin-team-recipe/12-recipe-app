import { useCallback, useEffect, useRef, useState } from "react";

import { patchCartListItemTitle } from "@/src/actions/patchCartListItemTitle";
import { UseFormReturn } from "react-hook-form";

const useTileEditingState = (form: UseFormReturn<any>, index: number) => {
  const [isEditing, setIsEditing] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState<number | null>(null);
  const [isInitialRender, setIsInitialRender] = useState(true);
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

  const currentItem = form.getValues(`cartListItem.${index}`);

  const handleEditTitle = useCallback(async () => {
    setIsEditing(false);
    await patchCartListItemTitle(currentItem.id, currentItem.ingredient);
  }, [currentItem]);

  useEffect(() => {
    if (isEditing && textareaRef?.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  return {
    isEditing,
    setIsEditing,
    isInitialRender,
    textareaHeight,
    textareaRef,
    handleHeightChange,
    handleTextareaFocus,
    handleEditTitle,
  };
};

export default useTileEditingState;
