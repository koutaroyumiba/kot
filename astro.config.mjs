// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://koutaroyumiba.com",

  redirects: {
    "/books": {
      status: 301,
      destination: "/reading",
    },
    "/books/hall-of-fame": {
      status: 301,
      destination: "/reading/hall-of-fame",
    },
  },

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
