# 技术栈规格 (Tech Stack Spec)

> 记录项目所采用的核心技术、框架与动效库，以及选型理由。

## 1. 基础框架
| 技术 | 版本/说明 | 选型理由 |
|------|-----------|----------|
| **Next.js** (App Router) | 15+ | React 生态中最成熟的元框架，支持 Static Export，完美适配 GitHub Pages 部署。 |
| **React** | 19+ | 用户最熟悉，组件化开发利于维护复杂的动效与交互状态。 |
| **TypeScript** | 5+ | 类型安全，长期维护必备。 |
| **Tailwind CSS** | 4+ | 原子化 CSS，快速实现响应式布局与玻璃态等现代视觉效果。 |

## 2. 动效与交互库
| 技术 | 职责 | 说明 |
|------|------|------|
| **Framer Motion** | 主流动效、页面过渡、手势交互 | React 原生手势与动画库，用于滚动触发动画、布局动画、页面切换。 |
| **Animate.css** | 微交互、快速入场动画 | 用于按钮 hover、toast 提示、简单 fade/slide 等不需要复杂 JS 控制的微动效。 |
| **React Bits** | 高阶 UI 动效组件 | 基于 React + Tailwind 的精选动画组件库（如文本渐变、模糊揭示、磁吸按钮等）。 |
| **Magic UI** | 高阶 UI 动效组件 | 与 React Bits 互补，提供粒子背景、 marquee、3D 卡片等炫酷组件。 |
| **Three.js + React Three Fiber (R3F)** | 3D 场景与 WebGL 效果 | 用于 Hero 区的背景 shader、粒子系统或未来的 3D 交互元素。目前作为"储备弹药"，先保留接口。 |

## 3. 工程化与部署
| 技术 | 说明 |
|------|------|
| **pnpm** | 包管理器（推荐），速度快、节省磁盘。 |
| **ESLint + Prettier** | 代码规范与格式化。 |
| **next/image** | 图片优化，配合 Static Export 时需注意 `unoptimized` 配置。 |
| **GitHub Actions** | CI/CD 自动构建并部署到 GitHub Pages。 |

## 4. 目录结构（暂定）
```
index/
├── app/                 # Next.js App Router
│   ├── page.tsx         # 主页（单页应用式滚动）
│   ├── layout.tsx       # 根布局（字体、全局 Providers）
│   └── globals.css      # 全局样式 + Tailwind 导入
├── components/          # 公共组件
│   ├── ui/              # 基础 UI（按钮、卡片、标签）
│   ├── magicui/         # Magic UI 组件隔离目录
│   ├── reactbits/       # React Bits 组件隔离目录
│   └── sections/        # 页面各区块组件
├── hooks/               # 自定义 React Hooks
├── lib/                 # 工具函数、常量
├── types/               # TypeScript 类型定义
├── public/              # 静态资源（图片、模型、字体）
│   └── images/
├── spec/                # 规格文档与历史记录
└── next.config.js       # Static Export 配置
```

## 5. 关键配置项
- `output: 'export'`：启用 Next.js 静态导出。
- `distDir: 'dist'`：输出到 `dist` 目录，方便 GitHub Pages 识别。
- `images.unoptimized: true`：静态导出时关闭图片优化服务。
- 基础路径 `basePath`：若使用自定义域名则无需配置；若使用 `peterwangll.github.io/index` 则需要设置。
