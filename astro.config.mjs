// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://koutaroyumiba.com",

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
