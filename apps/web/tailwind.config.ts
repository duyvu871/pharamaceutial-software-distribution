// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets"> = {
  content: [
    "./src/app/**/*.tsx",
    "./src/components/**/*.tsx",
    "./src/pages/**/*.tsx",
    "./src/layouts/**/*.tsx",
    "./src/sections/**/*.tsx",
    "./src/container/**/*.tsx",
    "./src/styles/**/*.css",
  ],
  presets: [sharedConfig],
};

export default config;
