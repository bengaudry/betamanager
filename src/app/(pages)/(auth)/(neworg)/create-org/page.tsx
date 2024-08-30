"use client";

import { CTA } from "@/components/CTA";
import { PageWrapper } from "@/components/PageWrapper";
import { TextInput } from "@/components/TextInput";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateOrgPage() {
  const { push } = useRouter();
  const [organizationName, setOrganizationName] = useState<string>("");

  return (
    <div className="max-w-screen-lg mx-auto">
      <PageWrapper title="Create an organization">
        <TextInput
          label="Organization name"
          error={(() => {
            if (organizationName.length < 3) return "Too short";
          })()}
          value={organizationName}
          onChangeText={setOrganizationName}
        />
        <CTA
          label="Continue"
          className="w-full mt-2"
          onClick={() =>
            push(`/link-github?organization-name=${organizationName}`)
          }
        />
      </PageWrapper>
    </div>
  );
}
