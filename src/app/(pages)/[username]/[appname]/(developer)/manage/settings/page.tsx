"use client";
import { useContext } from "react";
import { PageWrapper } from "@/components/PageWrapper";
import { ProjectDataContext } from "@/components/Providers/ProjectDataProvider";
import { SecretKeyDisplayer } from "@/components/SecretKeyDisplayer";

export default function AppSettingsPage() {
  const project = useContext(ProjectDataContext);

  return (
    <PageWrapper title="Settings">
      <div className="max-w-screen-sm">
        <SecretKeyDisplayer key={project?.id ?? ""} />
      </div>
    </PageWrapper>
  );
}
