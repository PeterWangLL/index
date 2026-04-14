# 变更日志 (Changelog)

> 按时间倒序记录所有对项目结构、spec 文档、代码的重大变更。

## 2025-04-14
### Contact 区重构为 qzq.at 风格，同步归档所有 Spec 文档
- **Contact 区最终设计**：参考 [qzq.at](https://qzq.at) 的结尾风格，放弃复杂的磁吸卡片/轨道环绕方案，改为简洁有力的叙事收尾。
  - 中央大字号座右铭：*"There are countless ways to tell a story about the world, this is mine."*
  - 滚动进入时，文字使用 Framer Motion `staggerChildren` 实现**逐词淡入**（word-by-word reveal）。
  - 下方圆形社交图标（GitHub、Email），hover 时背景填充+轻微放大。
  - 最底部极简版权信息。
- **同步更新所有过时 Spec 文档**：
  - `spec/01-tech-stack.md`：补充 Markdown 渲染依赖（gray-matter、react-markdown、remark-gfm 等），目录结构增加 `content/posts/` 和 `app/blog/[slug]/`。
  - `spec/02-layout.md`：更新 Contact 区设计描述，移除之前待选的三种复杂方案。
  - `spec/03-motion-components.md`：Contact 区动效改为 Framer Motion 原生实现（逐词淡入 + 图标 hover），Glass Icons 移入储备池。
- 构建验证通过。

### 调整 Code 区定位，重新设计 Contact 区
- **Code 区调整**：移除链接到旧博客的"查看更多文章"按钮。明确 Code 区将展示站内 Markdown 文章（硬核技术内容）和未来的部署项目。安装 `gray-matter`、`react-markdown`、`remark-gfm`、`rehype-slug`、`rehype-autolink-headings` 为后续站内文章渲染做准备。
- **Contact 区重构**：拒绝平庸 footer，打造"仪式感的联系终章"。
  - 区域高度 `min-h-[60vh]`，营造压轴感。
  - 大号 "Say Hi." 标题，带 Framer Motion 滚动入场。
  - 中间玻璃态卡片 + **磁吸复制按钮**（Magnetic Button），点击邮箱一键复制并反馈 "已复制到剪贴板 ✓"。
  - 底部社交链接 + 极简版权信息。
- 更新 `spec/02-layout.md`：Code 区不再外链，Contact 区设计方向更新为"仪式感的联系终章"。
- 构建验证通过。

### 调整页面顺序、细化 Life 架构、优化 Code 区表达
- **调整区块顺序**：Home → Introduction → Life → Code → Music → Books → Games → Contact。
- **重命名 About → Introduction**：组件文件 `About.tsx` 重命名为 `Introduction.tsx`，id 与导航锚点同步更新。
- **细化 Life 区架构**：
  - 在 `Life.tsx` 中增加子板块标签栏：全部 / 健身 / 旅游 / 爬山 / 时刻 / 随拍。
  - 明确"主页精选 + 子频道可扩展"策略，底部添加"更多记录持续更新中"提示。
  - 在 `spec/02-layout.md` 中详细定义 Fitness、Travel、Hiking、Moments、Photography 五大子类别及其未来扩展方式。
- **优化 Code 区表达**：删除"毕业近1年项目大多未部署"的自贬式文案，改为积极中性的技术文章展示；项目卡片暂时移除，待 NAS 部署完成后再填充。
- 更新 `spec/03-motion-components.md`：同步区块名称变更（About → Introduction）。
- 构建验证通过。

### 更新 .gitignore 并重构页面布局
- 完善 `.gitignore`：新增 `/dist/`、`*.log`、`.vscode/`、`.idea/`、`.eslintcache` 等常见忽略项。
- 参考 [qzq.at](https://qzq.at) 的叙事感主题分类风格，结合用户个人特点（孙燕姿歌迷、炉石/哈迪斯/文明6玩家、微信读书用户、NAS 搭建计划）重新设计页面结构。
- 重写 `spec/02-layout.md`：将原来的 Reading + Tech + Projects 拆分为 **Music → Games → Books → Code** 四大主题区，Life 区保留作为生活记录补充。
- 更新 `spec/03-motion-components.md`：根据新布局调整动效分配（Games 用 Bounce Cards、Books 用 Count Up、Code 区加入 Terminal 组件等）。
- 重构组件结构：
  - 删除旧组件 `Reading.tsx`、`Tech.tsx`、`Projects.tsx`。
  - 新增 `Music.tsx`、`Games.tsx`、`Books.tsx`、`Code.tsx`。
  - 更新 `Navigation.tsx` 锚点：Home / About / Music / Games / Books / Code / Life / Contact。
  - 更新 `app/page.tsx` 组装顺序。
- 构建验证通过。

### 项目初始化完成，搭建基础骨架
- 使用 `create-next-app` 初始化 Next.js 16 + React 19 + TypeScript + Tailwind CSS 4 项目，包管理器为 pnpm。
- 恢复原始 `.git` 仓库，保留 `spec/` 目录。
- 安装额外依赖：`framer-motion`、`animate.css`、`three`、`@react-three/fiber`、`@react-three/drei`、`clsx`、`tailwind-merge`。
- 配置 `next.config.ts`：`output: 'export'`、`distDir: 'dist'`、`images.unoptimized: true`。
- 更新 `app/layout.tsx`：设置语言为 `zh-CN`，页面标题与描述，全局开启 `scroll-smooth`。
- 更新 `app/globals.css`：配置系统字体栈，移除对 Google Fonts 的依赖（避免构建环境网络限制）。
- 创建 `lib/utils.ts`：提供 `cn()` 工具函数。
- 创建目录结构：`components/{ui,magicui,reactbits,sections}`、`hooks`、`lib`、`types`、`public/images`。
- 创建 8 大区块的骨架组件（Navigation、Hero、About、Life、Reading、Tech、Projects、Contact），并统一在 `app/page.tsx` 中组装。
- 首次构建验证通过，静态文件输出至 `dist/` 目录。

### 确认域名与动效组件，开始项目初始化
- 确认域名 `www.peterwangll.top`，计划项目完成后部署至 GitHub Pages 并绑定该域名替代旧博客。
- 新增 `03-motion-components.md`：整理用户挑选的 React Bits + Magic UI 组件，并给出第一阶段推荐分配方案（Pill Nav、Blur Text、Shiny Text、Profile Card、Animated Content、Bounce Cards、Interactive Hover Button、Glass Icons 等）。
- 更新 `00-principles.md` 与 `01-tech-stack.md`：补充域名与部署策略。

### 初始化项目规格
- 创建 `spec/` 目录与四份核心文档：
  - `00-principles.md` — 确立项目定位、内容定位、设计哲学与 Spec Coding 工作模式。
  - `01-tech-stack.md` — 确定 Next.js + React + TypeScript + Tailwind CSS 基础栈，动效层采用 Framer Motion + Animate.css + React Bits + Magic UI + Three.js/R3F，部署目标为 GitHub Pages Static Export。
  - `02-layout.md` — 定义单页滚动式 8 大区块：Navigation、Hero、About、Life、Reading、Tech、Projects、Contact/Footer，并给出各区块的职责、布局与动效方向。
  - `99-changelog.md` — 建立变更追踪机制。
