import Image from "next/image";
import { notFound } from "next/navigation";
import {
  lifeCategories,
  getTimelineItems,
  getCategoryLabel,
} from "@/lib/life-data";

export function generateStaticParams() {
  return lifeCategories.map((c) => ({ category: c.key }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const label = getCategoryLabel(category);
  return {
    title: `${label} | Life — Peter Wang`,
  };
}

export default async function LifeCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const valid = lifeCategories.some((c) => c.key === category);
  if (!valid) {
    notFound();
  }

  const items = getTimelineItems(category);
  const label = getCategoryLabel(category);
  const otherCategories = lifeCategories;

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      {/* Header */}
      <div className="mb-6">
        <a
          href="/#life"
          className="inline-flex items-center gap-1 text-sm text-foreground/60 hover:text-foreground transition-colors"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          返回 Life
        </a>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {label}
        </h1>

      </div>

      {/* Category switcher */}
      <div className="mb-10 flex flex-wrap gap-2">
        {otherCategories.map((cat) => (
          <a
            key={cat.key}
            href={`/life/${cat.key}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              cat.key === category
                ? "bg-foreground text-background"
                : "bg-foreground/5 text-foreground/80 hover:bg-foreground/10"
            }`}
          >
            {cat.label}
          </a>
        ))}
      </div>

      {/* Timeline */}
      {items.length === 0 ? (
        <div className="rounded-2xl border border-foreground/10 bg-foreground/5 px-6 py-16 text-center">
          <p className="text-foreground/60">该分类下暂时没有记录。</p>
        </div>
      ) : (
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-foreground/10 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12">
            {items.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              // 横屏统一 4:3，竖屏统一 3:4，避免强行拉伸或留白
              const aspectClass =
                item.orientation === "portrait"
                  ? "aspect-[3/4]"
                  : "aspect-[4/3]";

              return (
                <div
                  key={item.id}
                  className="relative flex items-start md:items-center"
                >
                  {/* Dot */}
                  <div className="absolute left-4 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-foreground/40 ring-4 ring-background md:left-1/2" />

                  {/* Content */}
                  <div
                    className={`ml-10 w-full md:ml-0 md:w-1/2 ${
                      isLeft
                        ? "md:pr-12 md:text-right"
                        : "md:ml-auto md:pl-12 md:text-left"
                    }`}
                  >
                    <time className="block text-xs font-medium text-foreground/50">
                      {item.date}
                    </time>
                    <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-foreground/70">
                      {item.desc}
                    </p>
                    <div
                      className={`mt-4 overflow-hidden rounded-2xl bg-foreground/5 ${
                        isLeft ? "md:ml-auto" : ""
                      }`}
                    >
                      <div className={`relative ${aspectClass}`}>
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom back link */}
      <div className="mt-16 text-center">
        <a
          href="/#life"
          className="inline-flex items-center gap-2 rounded-full bg-foreground/5 px-5 py-2 text-sm font-medium text-foreground/80 hover:bg-foreground/10 transition-colors"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          返回 Life 主页
        </a>
      </div>
    </main>
  );
}
