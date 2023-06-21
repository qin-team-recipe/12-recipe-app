import type { Config } from "tailwindcss";

import { shadcnPreset } from "./src/lib/shadcn-preset";

const config = {
  presets: [shadcnPreset],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
} satisfies Config;

export default config;
