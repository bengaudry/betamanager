import { type PropsWithChildren } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { LoadingIndicator } from "./LoadingIndicator";

export function PageWrapper({
  title,
  subtitle,
  children,
  loading,
}: PropsWithChildren & {
  title?: string;
  subtitle?: string;
  loading?: boolean;
}) {
  return (
    <>
      <LoadingIndicator loading={loading ?? false} />
      <div className="py-16 px-8 w-full">
        {(title || subtitle) && (
          <div className="mb-4">
            {title && <h1 className="font-bold text-3xl leading-7">{title}</h1>}
            {subtitle && (
              <h2 className="text-neutral-400 text-lg">{subtitle}</h2>
            )}
          </div>
        )}
        {children}
      </div>
    </>
  );
}
