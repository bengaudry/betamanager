import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type CTAProps = {
  small?: boolean;
  label: string;
  icon?: string;
  rightIcon?: string;
  secondary?: boolean;
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
  ...props
}: CTAProps) {
  const colors = secondary
    ? "from-indigo-500/30 to-indigo-700/30 text-black"
    : "from-indigo-500 to-indigo-700 text-white";

  return (
    <button
      className={`bg-gradient-to-b rounded-lg transition-all ${colors} enabled:hover:-translate-y-0.5 border-indigo-500/20 ${className}`}
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
          } text-nowrap font-semibold`}
        >
          {label}
        </span>
        {rightIcon && <i className={`fi fi-rr-${rightIcon} translate-y-0.5`} />}
      </div>
    </button>
  );
}
