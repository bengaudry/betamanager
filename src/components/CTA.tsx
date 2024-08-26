import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type CTAProps = {
  label: string;
  icon?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function CTA({ label, icon }: CTAProps) {
  return (
    <button className="flex flex-row items-center gap-2 bg-emerald-700 hover:bg-emerald-900 border-emerald-500 border px-4 py-2 rounded-md transition-colors">
      {icon && <i className={`fi fi-rr-${icon} translate-y-0.5`} />}
      <span className="text-nowrap">{label}</span>
    </button>
  );
}
