---
title: "Next.js 静态导出的踩坑记录"
date: "2025-04-10"
tags: ["Next.js", "Frontend"]
summary: "从动态路由到图片优化，梳理我在配置 output: 'export' 时遇到的几个典型问题。"
---

# Next.js 静态导出的踩坑记录

最近把个人主页迁移到了 Next.js，并且决定使用 `output: 'export'` 来做纯静态部署。整个过程比想象中多了一些坑，这里记录一下。

## 1. 动态路由的静态生成

使用 `output: 'export'` 时，所有动态路由（如 `[slug]`）必须配合 `generateStaticParams` 使用，否则构建会报错。这是因为在静态导出模式下，Next.js 需要在构建时就确定所有可能的页面路径。

```tsx
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

## 2. 图片优化必须关闭

静态导出不支持 Next.js 自带的图片优化服务（需要服务器），所以必须在 `next.config.ts` 中设置：

```ts
images: {
  unoptimized: true,
}
```

关闭后，`next/image` 会直接使用原始图片文件，不再生成 WebP 等优化版本。

## 3. API Routes 不可用

这一点很明显但容易被忽略：`output: 'export'` 模式下完全不能使用 `app/api` 路由。如果你的项目里有表单提交、数据库查询等逻辑，需要迁移到外部服务（如 Serverless Functions、第三方表单服务等）。

## 总结

`output: 'export'` 非常适合个人博客、文档站、营销页面这类纯展示型站点。只要提前规划好路由和图片策略，部署到 GitHub Pages 或 CDN 上非常省心。
