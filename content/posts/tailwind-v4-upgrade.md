---
title: "Tailwind CSS 4 升级体验"
date: "2025-02-15"
tags: ["Tailwind", "CSS"]
summary: "新版的 @import 语法、主题变量变化，以及迁移过程中的兼容性处理。"
---

# Tailwind CSS 4 升级体验

Tailwind CSS 4 带来了一些底层架构的变化，尤其是从 PostCSS 插件模式转向了基于 Lightning CSS 的新引擎。这里记录一下我升级过程中的几个注意点。

## 配置方式的变化

Tailwind 4 推荐使用 CSS 原生的 `@import` 和 `@theme` 来配置，而不是传统的 `tailwind.config.js`。例如：

```css
@import "tailwindcss";

@theme {
  --color-background: #0a0a0a;
  --color-foreground: #ededed;
}
```

这意味着很多以前写在 JS 配置里的主题扩展，现在要迁移到 CSS 文件中。

## 插件兼容性

一些基于 `tailwind.config.js` 的第三方插件在 v4 下可能需要更新。如果插件作者还没有适配，可能需要暂时手动实现对应的功能。

## 构建速度

官方宣称构建速度提升了数倍。在我的个人主页项目里（规模不大），体感确实比 v3 快了一些，尤其是在 HMR 热更新时几乎无感知。

## 建议

如果是新项目，直接上 v4 很香。如果是已有的大型项目，建议等核心插件生态完全跟上后再迁移。
