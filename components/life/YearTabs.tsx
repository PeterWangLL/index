"use client";

export type YearTabsProps = {
  years: number[];
  activeYear: number;
  onChange: (year: number) => void;
};

export default function YearTabs({ years, activeYear, onChange }: YearTabsProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {years.map((year) => (
        <button
          key={year}
          onClick={() => onChange(year)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            year === activeYear
              ? "bg-[#B83B5E] text-white"
              : "bg-foreground/5 text-foreground/80 hover:bg-foreground/10"
          }`}
        >
          {year}
        </button>
      ))}
    </div>
  );
}
