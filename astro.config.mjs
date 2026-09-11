// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://koutaroyumiba.com",
  integrations: [react()],

  markdown: {
    shikiConfig: {
      themes: {
        dark: "rose-pine",
        light: "rose-pine-dawn",
      },
      defaultColor: false,
      wrap: false,
      transformers: [
        {
          name: "code-block-tabindex",
          pre(node) {
            node.properties.tabindex = 0;
          },
        },
      ],
    },
  },
});
