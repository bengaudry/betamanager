import { type PropsWithChildren } from "react";

export function PageWrapper({
  title,
  subtitle,
  children,
}: PropsWithChildren & { title?: string; subtitle?: string }) {
  return (
    <div className="py-16 px-8 w-full">
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h1 className="font-bold text-3xl leading-7">{title}</h1>}
          {subtitle && <h2 className="text-neutral-500 text-lg">{subtitle}</h2>}
        </div>
      )}
      {children}
    </div>
  );
}
