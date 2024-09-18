import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export type CTAColor = "danger" | "neutral" | "valid" | "warning" | "colored";

export type CTAProps = {
  small?: boolean;
  label: string;
  icon?: string;
  rightIcon?: string;
  secondary?: boolean;
  color?: CTAColor;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function CTA({
  label,
  small,
  icon,
  rightIcon,
  className,
  secondary,
  color = "neutral",
  ...props
}: CTAProps) {
  const btnOpacity = secondary ? "bg-opacity-20 dark:bg-opacity-20" : "";

  const getBackgroundColors = () =>
    color === "colored"
      ? "bg-gradient-to-b from-indigo-500 to-indigo-700"
      : color === "danger"
      ? "bg-red-500"
      : color === "warning"
      ? "bg-orange-500"
      : color === "valid"
      ? "bg-green-500"
      : "bg-neutral-900 dark:bg-neutral-100";

  const getForegroundColors = () =>
    color === "colored"
      ? secondary
        ? "text-black"
        : "text-white"
      : color === "danger"
      ? "text-white"
      : color === "warning"
      ? "text-white"
      : color === "valid"
      ? "text-white"
      : secondary
      ? "text-neutral-900 dark:text-neutral-100"
      : "text-neutral-100 dark:text-black";

  return (
    <button
      className={`rounded-lg transition-all enabled:hover:-translate-y-0.5 ${btnOpacity} ${getBackgroundColors()}  ${className}`}
      onMouseEnter={() => console.log("hovering cta")}
      {...props}
    >
      <div
        className={`flex flex-row items-center justify-center gap-2 ${
          small ? "px-4 py-2" : "px-6 py-2"
        }`}
      >
        {icon && <i className={`fi fi-rr-${icon} translate-y-0.5`} />}
        <span
          className={`${
            small ? "text-sm" : "text-base"
          } text-nowrap font-semibold ${getForegroundColors()}`}
        >
          {label}
        </span>
        {rightIcon && <i className={`fi fi-rr-${rightIcon} translate-y-0.5`} />}
      </div>
    </button>
  );
}
