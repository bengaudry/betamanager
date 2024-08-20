"use client";
import { PageWrapper } from "@/components/Page";
import { useParams } from "next/navigation";

export default function AppBetaPage() {
  const { appid } = useParams();

  return (
    <PageWrapper title="App name">
      {process.env.NODE_ENV === "development" && <p>App id : {appid}</p>}

      <button>Report an issue</button>
      <br />
      <button>Submit a suggestion</button>
    </PageWrapper>
  );
}
