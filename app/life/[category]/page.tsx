import { notFound } from "next/navigation";
import {
  lifeCategories,
  getTimelineItems,
  getCategoryLabel,
  getFitnessRecords,
} from "@/lib/life-data";
import DefaultTimeline from "@/components/life/DefaultTimeline";
import FitnessHeatmap from "@/components/life/FitnessHeatmap";
import ComparisonSlider from "@/components/life/ComparisonSlider";
import MomentsGallery from "@/components/life/MomentsGallery";
import TravelTimeline from "@/components/life/TravelTimeline";

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

function HikingComparison({ items }: { items: ReturnType<typeof getTimelineItems> }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.id} className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
            <time className="text-xs font-medium text-foreground/50">{item.date}</time>
          </div>
          <p className="text-sm text-foreground/70">{item.desc}</p>
          <ComparisonSlider
            leftImage={item.landscapeImage || item.src}
            rightImage={item.bandImage || item.src}
            leftLabel="风景"
            rightLabel="运动记录"
            className="aspect-[4/3] w-full"
          />
        </div>
      ))}
    </div>
  );
}

function MomentsGalleryWrapper({ items }: { items: ReturnType<typeof getTimelineItems> }) {
  const years = Array.from(new Set(items.map((i) => new Date(i.date).getFullYear()))).sort(
    (a, b) => b - a
  );
  const defaultYear = years[0] ?? new Date().getFullYear();
  return <MomentsGallery items={items} years={years} defaultYear={defaultYear} />;
}

function FitnessSection() {
  const records = getFitnessRecords();
  return <FitnessHeatmap records={records} />;
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
          className="inline-flex items-center gap-1 text-sm text-foreground/60 hover:text-[#B83B5E] transition-colors"
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
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
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
                ? "bg-[#B83B5E] text-white"
                : "bg-foreground/5 text-foreground/80 hover:bg-foreground/10"
            }`}
          >
            {cat.label}
          </a>
        ))}
      </div>

      {/* Category-specific content */}
      {category === "fitness" && <FitnessSection />}
      {category === "travel" && <TravelTimeline items={items} />}
      {category === "hiking" && <HikingComparison items={items} />}
      {category === "moments" && <MomentsGalleryWrapper items={items} />}
      {(category === "photography" || category === "all") && <DefaultTimeline items={items} />}

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
