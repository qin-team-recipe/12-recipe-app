import { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

import { shadcnPlugin } from "./shadcn-plugin";

export const shadcnPreset = {
  content: [],
  plugins: [animatePlugin, shadcnPlugin],
} satisfies Config;
