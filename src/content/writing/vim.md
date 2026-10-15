---
title: "the vim rabbit hole"
description: "why I decided to learn vim and become a chad"
publishedAt: "2026-10-15"
topic: "Technology"
tags:
  - vim
  - tech
draft: false
---

So I finally got up to making a blog/writing/yap/whatever page on this site. I wish my first post was as cool-sounding as [GROUP-ing my thoughts on GROUP theory](https://ericzheng.nz/blog/group_theory.html) but I digress.

TL:DR - I watched [ThePrimeagen](https://www.youtube.com/watch?v=y6VJBeZEDZU) fly around a codebase *BLAZINGLY* fast and I was like, "that's gon be me", and now I use [neovim](https://github.com/koutaroyumiba/nvim) (btw) as my daily driver

This article isn't about Neovim (although, I do have a [page](/projects/neovim/) for that hehe). It's about how I learned vim motions and how other people can start from literally zero without getting intimidated :D.

---

So what even is this scary `vim` thing and why do people say ***"I use vim, btw"*** like its some kind of crowning achievement?

Vim is what you would call a modal editor, which is another word for saying editors with different modes. This is the first main point of confusion for people because most editors are always just ready for you to type text. There's 4 main modes of vim (there's actually 6 :nerd:) - Normal, Insert, Visual and Command.

- **Normal mode** - for main navigation
- **Insert mode** - for typing text like a normal human being (this is like the 'editor' mode)
- **Visual mode** - for selecting text
- **Command mode** - for executing commands (e.g. saving and quitting)

> I think it's important to make the distinction between vim, the editor, and vim-motions. Vim, the editor, is an modal editor that you can launch from your terminal (most devices come with vim installed - you can try it by typing `vim` in your terminal :D) which use some combination of letters to move and edit text (which I'll talk deeper in depth about later). These combinations or "motions" are what we call "vim-motions" which became so popular that many major editors now support emulating vim motions (commonly as a plugin/extension).
>
> My main suggestion from this blog is recommending everyone to learn vim motions - not the editor (but you can switch if you want to hehe).

If you are wanting to learn, I recommend NOT switching your editor, and instead just try to see if there is a vim motion emulator extension/plugin on the editor you use. Most editors should support this (e.g. VSCode), install that extension and then learn it inside your own editor. This lets you learn the motions while keeping the file explorer, debugger, autocomplete and other stuff you already understand. Vim, the editor, is like a whole other rabbit hole to go down...

## Why I wanted to learn Vim

Once upon a time, I came across a super cool ex-Netflix (btw) youtuber named [ThePrimeagen](https://www.youtube.com/@ThePrimeagen) and bro was moving around his codebase **BLAZINGLY FAST**, like an actual wizard. It honestly looked so cool and I knew I had to LOCK IN and learn it. It was like they weren't even thinking, it was just like they just think what they want, and the editor just did it for them. A few keypresses and then BANG, a whole function refactored, holy bang das gotta be like software dev ball knowledge.

## Getting Started with Vim Motions

So there's this thing called `vimtutor` that comes on most UNIX systems (sorry Windows...). If you type `vimtutor` on the terminal, a tutorial for vim motions comes up, which is how I learnt vim initially. It gives a good overview of most of the vim motions that you would use but it does kind of overwhelm you with information. I think it's good to skim through at the start to get a general vibe of how vim motions work.

A general recommendation that I make is don't try to learn everything at once. There's so many operations and commands in vim that it does become overwhelming pretty quickly. Start with just learning one or two basic commands at a time, using those until it becomes second nature and then learning more commands (so only learn a handful of commands at a time). You really only need a small group of commands to move and make basic edits, just learn those and only add new ones when you start noticing yourself doing something awkward.

## Introduction to Vim Motions

So like I said, vim has a bunch of modes. When you launch `vim`, you typically start in Normal mode. You can press `i` to enter Insert mode, type some text, and press `Esc` to return to Normal mode. Initially, you might find this idea of needing to go into a different "mode" to edit text annoying but eventually, you will come to realise that it's like the greatest thing to ever exist. Instead of needing to hold modifier keys or reaching for the mouse, ordinary keys become commands and navigation. You can check what mode you are currently in at the bottom of your editor (it should say `NORMAL`, `INSERT`, etc).

> All key commands listed here will name the mode first, then the key stroke, then what the command does
>
> For example, `[Normal] i -> goes into insert mode before the current cursor`
>
> This means, in Normal mode, type `i` to go into insert mode before the current cursor.

### Learn basic commands

Start with:

```text
[Normal] i   -> go into insert mode before the cursor;
[Normal] a   -> go into insert mode after the cursor;
[Normal] o   -> open a new line below the current line;
[Normal] O   -> open a new line above the current line;
[Any   ] Esc -> return to normal mode;
```

It is tempting to stay in insert mode forever since it is what people are used to but try not to. Go into insert mode, type the text you need, and then return to Normal mode. Once you get used to vim motions, Normal mode should gradually become your default resting place.

One extra thing: You can also use `Ctrl-C` or `Ctrl-[` to go back to normal mode, which is what I personally use. If you want to go even further (which I recommend) is to remap your caps-lock key to be `Ctrl`. It's way easier to press and it'll improve your worflow ALOT 10/10 would recommend.

VERY IMPORTANT TO KNOW:

Learn how to quit out of vim :D (doesn't apply if you're using a extension/plugin, I think):

```
[Normal] :w  -> saves the file
[Normal] :q  -> quits vim
[Normal] :wq -> save and quit vim
[Normal] :q! -> quit vim without saving
```

### Learn basic movement

```text
[Normal] h -> move left;
[Normal] j -> move down;
[Normal] k -> move up;
[Normal] l -> move right;
```

These are the classic movement that vim is known for. These are useful but it does get annoying pretty fast if you have to press `hhhhhhhhh` to move across a line. There are some more useful motions for larger movement:

```text
[Normal] w -> go to the next word (cursor at the start);
[Normal] b -> go to the previous word (cursor at the start);
[Normal] 0 -> go to the start of the line (actual start)
[Normal] _ -> go to the first character of the line;
[Normal] $ -> go to the end of the line;
[Normal] gg -> go to the top of the file;
[Normal] G -> go the bottom of the file;
```

### Learn basic operations

The above things are for navigating a file. The things below are editing or "doing things" (I'm so good at explaining) to text.

```
[Normal] d
[Normal] c
[Normal] y
[Normal] p
[Normal] u
[Normal] Ctrl-r
```

These command should be combined with motions you already know. If `w` moves forward a word, then `dw` deletes forward a word (deletes from the current cursor up to the next word). This is the key part of vim motions - you are reusing the intuitive grammar rather than having to memorise unrelated shortcuts.

### Learn Text Objects

In Vim, we have this concept of text objects. You already know one of them - `w` - which is a word text object. Some other notable ones are `"` (quoted strings), `(` (brackets), `{` (squirlies?!?!?!), `[` (square), `p` (paragraph), `t` (html tag).

These can be combined with `i` and `a` for inside and around respectively. "inside" does the operation inside the text object while "around" also includes the text object.

The general syntax to follow for these is:

```vim
[operation][i | a][text object]
```

So for example:

```
# cursor is currently between r and i
pr|int("hello world")

ci"
# deletes everything in the quotation marks and goes into insert mode at the quotation mark
print("|")

ca"
# deletes everything INCLUDING the quotation marks and goes into insert mode
print(|)

```

If done outside of the text object, it will jump to the first instance of the text object which is pretty useful. Some other useful text object stuff to know are:

```
[Normal] ciw -> change inside a word;
[Normal] diw -> delete inside a word;
[Normal] ci( -> change inside parentheses;
[Normal] ci" -> change inside quotation marks;
```

I think this is around the time where vim motions become actually super productive because you can edit strings and function arguments super quickly.

### Learn search

A small command that is super useful is search (`/`)

```vim
[Normal] /<text> -> search forward for <text>
[Normal] ?<text> -> search backward for <text>
[Normal] n       -> go to the next match
[Normal] N       -> go to the previous match
```

## Learning plan

If I was starting again, I would probably (I can't guarantee my ability to follow instructions) do something like this:

- Week 1: use vim motions in my current editor, focus on the basic commands and movement. Use your mouse/arrow keys if you are completely stuck but try not to use them as much as possible.
- Week 2: Add operations to your workflow along with a few text objects. Practise things like `diw`, `ciw`, `ci"`.

Bang that's probably all you need to feel productive. After that, you can add things to your workflow when you need them. Things like search, visual mode (lwk this one's good to know), command mode (this ones also pretty good to know). Keep practicing the two or three commands that you are currently learning, and once they become automatic, replace them with something new.

## Tips!!

1. You will be slow at the start. Don't be discouraged! Replacing years of muscle memory takes time and so your productivity will tank before it improves. I'd say give it at least two weeks before making a decision.
2. Do not remap every uncomfortable command immediately. The default motions are more often than not all you need, and when you choose to remap commands, you sacrifice portability and most of the time, they are intuitive in the bigger picture that you don't understand yet (probably idk).

### Moving to Neovim

Just a note on switching editors. You don't need to switch to neovim or vim to learn vim motions. I would only move to them when the motions feel reasonably comfortable and you are interested in making the whole editor keyboard-first and infinitely customisable.

I switched to Neovim as soon as I started vim motions which kinda tanked my productivity for like a month because I was trying to learn both at the same time. Building my nvim config from scratch definitely did teach me a lot but it was a separate skill from learning vim motions. Neovim is also a whole other rabbit hole that you can go down (I feel like I said this already), and is a very dangerous one. Configuring neovim can become way more interesting than doing the work you configured it for. You sit down to do some work, realise that there's something bothering you about the current workflow, and 5 hours later, you replaced a whole fuzzy finder and forgot the work that you were trying to do.

## Final Thoughts

Did Vim make me a chad? Debatable. However, it definitely make my text editing experience way more enjoyable. Navigation requires less thought, repeated changes are easier, and my editor feels shaped around how I actually work. You do not need Vim to be a good programmer, and using a mouse does not make you a bad one. But if a keyboard-driven editing looks satisfying, start with a Vim extension, run `vimtutor`, learn a small group of commands, and use them until they become automatic.

It will feel terrible before it feels good and ***blazingly fast***. Then, one day, you will watch someone hold the arrow key to move across a line and think, "wow, what a noob" - which is when you know you're ready to larp and say, "I use vim, btw".
