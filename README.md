# koutaroyumiba.com

A fast, static personal website built around a minimal CLI-inspired interface.

> A little fun project to showcase all my other projects and log my experiences...
> Hopefully, I can start a blog page or something to talk about some of the cool things I find

[Visit the website](https://koutaroyumiba.com)

## Features

- Responsive CLI-inspired interface
- Accessible Rose Pine dark and light themes
- Keyboard-accessible `:jump` palette
- Static reading catalogue with filters
- Typed project and Leetcode content collections
- Question-ID Leetcode routes
- Progressive enhancement with no client framework
- Compatibility redirects for renamed routes

## Technology

- [Astro](https://astro.build)
- TypeScript
- [Iosevka](https://github.com/be5invis/Iosevka) (best font btw)
- [Rose Pine](https://rosepinetheme.com/) (best colour theme btw)
- GitHub Pages

## Project Structure

```
src/
    components/     // reusable Astro components
    content/        // writeup content
    data/           // typed site data
    layouts         // shared page layout
    pages/          // file-based routes
    styles/         // tokens, global and prose styles

public/             // static public assets
scripts/            // maintenance and migration scripts
templates/          // content templates
```

## Versioning

This site uses curated product releases rather than versioning every content update. See [VERSIONING.md](./VERSIONING.md).

## Leetcode Statistics for fun

![LeetCode Stats](https://leetcard.jacoblin.cool/koutaroyumiba?theme=dark&font=Ubuntu%20Mono&ext=heatmap)
