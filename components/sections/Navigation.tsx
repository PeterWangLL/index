"use client";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const navItems = [
  { label: "Home", href: "#home" },
  // { label: "Introduction", href: "#introduction" },
  { label: "Life", href: "#life" },
  // { label: "Code", href: "#code" },
  { label: "Music", href: "#music" },
  { label: "Books", href: "#books" },
  { label: "Games", href: "#games" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="text-lg font-bold tracking-tight text-foreground">Peter</div>
        <div className="flex items-center gap-4">
          <ul className="hidden gap-6 text-sm font-medium text-foreground/80 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="transition-colors hover:text-[#B83B5E]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <AnimatedThemeToggler />
          {/* Mobile menu toggle placeholder */}
          <button className="text-foreground md:hidden" aria-label="Open menu">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
