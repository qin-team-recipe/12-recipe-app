"use client";

import { ReactNode } from "react";

import { Provider } from "jotai";

type Props = {
  children: ReactNode;
};

const JotaiProvider = ({ children }: Props) => {
  return <Provider>{children}</Provider>;
};

export default JotaiProvider;
