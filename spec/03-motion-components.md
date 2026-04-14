# 动效组件选型 (Motion Components Selection)

> 记录用户挑选的 React Bits / Magic UI 组件，以及当前阶段推荐使用的区块分配方案。遵循"克制堆叠"原则，按需引入。

## 候选池（用户挑选）

### React Bits
- Animated Content
- Bounce Cards
- Blur Text
- Chroma Grid
- Counter / Count Up
- Glass Icons
- Orbit Images
- Pill Nav
- Profile Card
- Rotating Text
- Scroll Stack
- Shiny Text
- Split Text

### Magic UI
- Terminal
- orbiting-circles
- Icon Cloud
- Pointer
- dotted map
- Animated theme toggler
- text highlighter
- Cool mode
- Interactive Hover Button

---

## 第一阶段推荐分配方案
以下是我们目前建议使用的组件与对应区块。其余组件作为"储备池"，后续根据实际效果再决定是否替换。

| 区块 | 推荐组件 | 来源 | 效果说明 |
|------|----------|------|----------|
| **Navigation** | **Pill Nav** | React Bits | 导航链接做成胶囊形态，hover/active 时有背景滑块动画，与玻璃态导航栏很搭。 |
| **Hero - 名字** | **Blur Text** | React Bits | 名字从模糊到清晰的入场，作为首屏主视觉非常抓眼。 |
| **Hero - Slogan** | **Shiny Text** | React Bits | Slogan 文字上的光泽扫过效果，增加呼吸感。 |
| **Hero - 标签** | **Rotating Text** | React Bits | 关键词轮播（Developer / Gamer / Music Lover / Hiker），放在名字下方增加动态感。 |
| **Introduction** | **Profile Card** | React Bits | 个人头像/卡片，hover 时有 3D 倾斜或光泽，比普通图片更有质感。 |
| **Introduction - 内容入场** | **Animated Content** | React Bits | 段落文字 stagger 渐入，让自我介绍更有叙事节奏。 |
| **Life - 卡片** | **Bounce Cards** 或 **Scroll Stack** | React Bits | 生活卡片 hover 弹性反馈；Scroll Stack 适合 Moments 的堆叠叙事。 |
| **Code - 按钮** | **Interactive Hover Button** | Magic UI | "阅读更多"按钮的 hover 磁吸+粒子效果，提升点击欲望。 |
| **Code - 装饰** | **Terminal** | Magic UI | 在 Code 区用命令行风格展示技术栈或一段欢迎语，非常有程序员味道。 |
| **Books - 数据** | **Count Up** | React Bits | 阅读时长、读完书数量等数据的数字递增动画，增强成就感。 |
| **Games** | **Bounce Cards** | React Bits | 游戏卡片 hover 时的弹性反馈，与游戏主题的活泼感完美契合。 |
| **Contact - 文字** | Framer Motion `staggerChildren` | 原生实现 | 座右铭文字逐词淡入（word-by-word reveal），模仿叙事尾声的仪式感。 |
| **Contact - 图标** | 原生 CSS / Tailwind | 原生实现 | 社交图标 hover 时背景填充+轻微放大，简洁不喧宾夺主。 |
| **全局** | **Animated theme toggler** | Magic UI | 若后续加入 dark/light 切换，该 toggler 的动画非常精致。 |

## 储备池（待决策）
以下组件效果也很好，但与第一阶段推荐方案可能存在功能重叠，后续根据实际视觉反馈由用户决定是否替换：

- **Split Text** (React Bits): 与 Blur Text 同为文字入场效果，可作为 Slogan 或副标题的替代。
- **Chroma Grid** (React Bits): 网格颜色渐变效果，可用于 Life 区背景装饰。
- **Orbit Images** (React Bits): 图片围绕中心轨道旋转，可用于 Introduction 或 Music 的装饰背景。
- **orbiting-circles** (Magic UI): 轨道圆环装饰，可作为 Hero 区轻量背景储备。
- **Icon Cloud** (Magic UI): 技术栈 logo 云，可作为 Code 区的视觉补充。
- **text highlighter** (Magic UI): 用于高亮关键句子，适合 Introduction 或 Books 区。
- **dotted map** (Magic UI): 旅行/户外足迹地图，若 Life 区想展示地理位置分布时可用。
- **Pointer** (Magic UI): 自定义光标效果，可作为全局微交互增强。
- **Cool mode** (Magic UI): 点击或 hover 时产生粒子喷射，趣味性很强，适合 Games 区的按钮。
- **Glass Icons** (React Bits): 若后续想让社交图标有更强烈的光晕/折射效果，可替换 Contact 区的原生图标。

## 引入策略
1. React Bits 与 Magic UI 的组件大多以"Copy-Paste"或 CLI 方式引入（类似 shadcn/ui）。
2. 所有引入的第三方组件统一放置于 `components/reactbits/` 和 `components/magicui/` 目录，保持隔离。
3. 不安装整个库，只引入需要的组件文件，减少打包体积。
