"use client";
import { PageWrapper } from "@/components/Page";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AppBetaPage() {
  const [appName, setAppName] = useState(null);
  const { appid } = useParams();

  useEffect(() => {
    fetch(`/api/project-details?app-id=${appid}`)
      .then((value) => value.json())
      .then((json) => {
        if (!json) return;
        console.info(json);
        setAppName(json.name);
      })
      .catch((err) => {
        console.error(err);
        setAppName(null);
      });
  }, []);

  const baseBtnClassName =
    " px-6 py-2 flex flex-row items-center gap-3 rounded-full transition-colors";

  return (
    <PageWrapper title={appName || "-"}>
      {process.env.NODE_ENV === "development" && (
        <p className="mb-4 text-neutral-500">App id : {appid}</p>
      )}

      <div className="flex flex-col w-fit gap-2">
        <button
          className={"bg-red-600/50 hover:bg-red-600/80" + baseBtnClassName}
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
