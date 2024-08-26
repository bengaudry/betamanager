import { useEffect, useState } from "react";

export function CopyBtn({
  text,
  className,
  iconClassName,
}: {
  text: string;
  className?: string;
  iconClassName?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setCopied(false), 1000);
    return () => clearTimeout(timeoutId);
  });

  return (
    <button
      className={`${className} ml-2`}
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => setCopied(true));
      }}
    >
      <i
        className={`block fi fi-rr-${copied ? "check" : "copy"} ${iconClassName} translate-y-0.5`}
      />
    </button>
  );
}
