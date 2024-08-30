"use client";
import { PageWrapper } from "@/components/PageWrapper";
import { useParams } from "next/navigation";

export default function AppBetaPage() {
  const { appid } = useParams();

  const baseBtnClassName =
    "px-6 py-2 flex flex-row items-center gap-3 rounded-full transition-colors";

  return (
    <PageWrapper title={appid[0].toUpperCase() + appid.slice(1)}>
      <div className="flex flex-col w-fit gap-2">
        <button
          className={"bg-red-600/50 hover:bg-red-600/80" + " " + baseBtnClassName}
        >
          <i className="fi fi-rr-shield-exclamation translate-y-0.5 text-lg" />
          Report an issue
        </button>
        <button
          className={"bg-sky-500/40 hover:bg-sky-500/70" + baseBtnClassName}
        >
          <i className="fi fi-rr-lightbulb-on translate-y-0.5 text-lg" />
          Submit a suggestion
        </button>
      </div>
    </PageWrapper>
  );
}
