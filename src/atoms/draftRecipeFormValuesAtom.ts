import { atom } from "jotai";

import { CreateRecipeFormValues } from "../components/create-recipe-form";
import { CreateDraftRecipeFormValues } from "../components/create-recipe-form/schema";

export const recipeFormStateAtom = atom<{ isDraft: boolean; draftRecipeFormValues: CreateDraftRecipeFormValues }>({
  isDraft: false,
  draftRecipeFormValues: {} as CreateDraftRecipeFormValues,
});
