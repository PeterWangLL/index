# 内容资产与图片管理规范 (Assets Management)

> 本文档定义项目中的文字内容、图片素材的管理方式、目录结构、响应式处理策略以及未来图床迁移方案。

---

## 1. 图片存储策略

### 当前阶段：项目内静态资源（GitHub Pages）
由于当前图片数量较少，且部署在 GitHub Pages，所有图片直接存放在项目 `public/` 目录下，与代码一起打包静态导出。

### 未来阶段：独立图床
当图片数量增长到影响仓库体积或构建速度时，迁移至独立图床（如阿里云 OSS、Cloudflare R2、GitHub 图床等）。迁移成本极低，只需批量替换图片 URL 前缀。

---

## 2. 目录结构

```
public/
└── images/
    ├── avatar/               # 个人头像、About 用图
    ├── life/
    │   ├── fitness/          # 运动、健身
    │   ├── travel/           # 旅行
    │   ├── hiking/           # 爬山/徒步
    │   ├── moments/          # 重要时刻
    │   └── photography/      # 随拍
    ├── music/                # 专辑封面、音乐相关
    ├── games/                # 游戏截图
    └── books/                # 书籍封面
```

### 命名规范
- 使用小写英文字母、数字、连字符 `-`、下划线 `_`
- 避免空格和中文文件名（防止 URL 编码问题）
- 示例：`hiking-huangshan-2024.jpg`、`hades-clear-32.jpg`

---

## 3. 图片尺寸不一致的处理方案

项目中会同时出现**竖屏**、**横屏**、**全景横屏**等不同比例的图片。我们采用**容器固定比例 + 图片填充裁剪**（`object-cover`）结合**网格适配**的策略：

### 3.1 CSS 层面：`object-cover`
所有图片卡片外层使用固定 `aspect-ratio` 的容器，内部图片设置：
```css
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```
这样可以保证网格整齐，图片按容器比例自动居中裁剪。

### 3.2 布局层面：按图片形状分配网格大小
在 Bento Grid 中，根据图片原始比例决定它占据的格子大小：

| 图片比例 | 推荐格子 | 说明 |
|---------|---------|------|
| 横屏 16:9 / 全景 21:9 | `col-span-2` | 占据两列宽度，充分发挥宽幅优势 |
| 竖屏 3:4 / 9:16 | `col-span-1` | 标准单列，或 `row-span-2` 拉高 |
| 方形 1:1 | `col-span-1` | 灵活放置 |

### 3.3 数据驱动图片配置
每个区块的图片不硬编码在组件里，而是通过数据文件（JSON / TS 数组）传入组件。数据中可以标记图片的推荐布局：
```ts
{
  src: "/images/life/hiking/huangshan-sunrise.jpg",
  alt: "黄山日出",
  category: "hiking",
  layout: "wide", // "wide" | "tall" | "normal"
  title: "黄山日出",
  date: "2024-05-01"
}
```
组件根据 `layout` 字段动态应用不同的 `className`（如 `col-span-2` 或 `row-span-2`）。

---

## 4. 如何给 AI 提供图片

### 方式一：直接放入项目目录（推荐）
将图片文件拷贝到 `/Users/apple/Documents/02learn/index/public/images/` 下的对应子文件夹中。AI 可以通过以下方式读取：
- `Shell` 工具查看文件列表和文件名
- `ReadMediaFile` 工具查看图片实际内容（确认是否正确）
- 然后在代码中引用相对路径 `/images/xxx/yyy.jpg`

### 方式二：提供外部 URL
如果图片已经上传到图床或网络相册，直接把 URL 发给 AI，AI 可以直接在代码中使用该 URL。

---

## 5. 图床迁移路径

未来从本地图片迁移到图床时，只需要一步：

1. 将 `public/images/` 下的所有图片上传到图床，获得新的 CDN 地址。
2. 在数据文件（如 `lib/data/images.ts`）中批量替换前缀：
   ```ts
   // 迁移前
   const baseUrl = "";
   // 迁移后
   const baseUrl = "https://your-cdn.com/images";
   ```
3. 组件代码完全不用修改。

---

## 6. 文字内容管理

### 站内 Markdown 文章
- 存放路径：`content/posts/`
- 文件格式：`.md`
- 必须包含 frontmatter：
  ```md
  ---
  title: "文章标题"
  date: "2025-04-14"
  tags: ["React", "Next.js"]
  summary: "一句话摘要"
  ---
  ```
- 正文使用标准 Markdown 语法。

### 各区块介绍文案
- 当前阶段由 AI 自由填充示例内容，用于视觉效果验证。
- 未来用户可根据自身情况直接修改对应组件文件中的静态文本。
- 如果某区块内容较多，可拆分为独立的数据文件（如 `lib/data/books.ts`、`lib/data/games.ts`）。
