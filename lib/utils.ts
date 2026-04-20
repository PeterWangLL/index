import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAssetPath(path: string): string {
  const basePath = process.env.__NEXT_ROUTER_BASEPATH || "";
  if (path.startsWith(basePath)) return path;
  return path.startsWith("/") ? `${basePath}${path}` : path;
}
