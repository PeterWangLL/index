<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:life-section-rules -->
# Life 板块约定

- 所有生活照片数据统一维护在 `lib/life-data.ts` 中。
- `lifeCategories` 不再包含 `"all"`（精选）与 `"photography"`（随拍）。当前保留：阿森纳、健身、旅行、时刻。
- 首页 `components/sections/Life.tsx` 的 Bento 网格展示 `bestOfBest` 优中选优的照片，这些数据维护在 `lib/life-data.ts` 中，统一使用 `category: "featured"`。
- 每个分类的查看全部页面为 `app/life/[category]/page.tsx`，采用时间轴布局，支持顶部分类切换。
- 照片展示统一使用 `object-cover` 裁剪填充固定画框：
  - 精选网格：`aspect-[4/3]`（normal）或 `aspect-[16/9]`（wide）。
  - 时间轴缩略图：横屏 `aspect-[4/3]`，竖屏 `aspect-[3/4]`，由数据中的 `orientation` 字段控制。
- 新增照片时，请在 `lib/life-data.ts` 中补充元数据（title、desc、date、orientation、featured 等），并将图片文件放入 `public/images/life/<category>/`。
<!-- END:life-section-rules -->
