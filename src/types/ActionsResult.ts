export type ActionsResult =
  | {
      isSuccess: true;
      message: string;
    }
  | {
      isSuccess: false;
      error: string;
    };
