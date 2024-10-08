import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://betamanager.vercel.app";
}

export function convertSearchParamToString(
  searchParam: string | string[] | undefined
): null | string {
  if (searchParam === undefined) return null;
  if (Array.isArray(searchParam)) return searchParam[0];
  return searchParam;
}
