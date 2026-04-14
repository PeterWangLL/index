---
title: "React 动画库选型笔记"
date: "2025-03-22"
tags: ["React", "Animation"]
summary: "对比 Framer Motion、GSAP 和 CSS 动画在不同场景下的优劣，以及我的选择逻辑。"
---

# React 动画库选型笔记

在构建个人主页的过程中，我花了一些时间调研 React 生态里的动画方案。这篇文章记录我的对比和最终选择。

## CSS 动画 / Transitions

**适用场景**：简单的 hover 效果、淡入淡出、切换状态。

**优点**：零依赖，性能最好，浏览器原生支持。
**缺点**：复杂的时间轴控制、手势交互、滚动触发很难用纯 CSS 实现。

## Framer Motion

**适用场景**：组件级动画、页面过渡、手势拖拽、滚动触发动画（`whileInView`）。

**优点**：
- API 极其 React 友好，声明式写法
- 内置 `AnimatePresence` 处理组件卸载动画
- `whileHover`、`whileTap`、`drag` 等手势支持非常自然

**缺点**：包体积比纯 CSS 大；极复杂的时间轴动画不如 GSAP 灵活。

## GSAP + @gsap/react

**适用场景**：复杂时间轴、精细的滚动联动（ScrollTrigger）、需要逐帧控制的动画。

**优点**：功能最全面，社区和文档非常成熟。
**缺点**：学习曲线较陡；在 React 中需要额外注意生命周期和 ref 管理。

## 我的选择

个人主页以组件动画和滚动触发为主，因此主力使用 **Framer Motion**。对于特别复杂的序列动画，会考虑引入 GSAP 作为补充。
