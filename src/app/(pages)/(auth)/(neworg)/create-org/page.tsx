"use client";

import { CTA } from "@/components/CTA";
import { PageWrapper } from "@/components/PageWrapper";
import { TextInput } from "@/components/TextInput";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateOrgPage() {
  const { push } = useRouter();
  const [userName, setUserName] = useState<string>("");

  return (
    <div className="max-w-screen-lg mx-auto">
      <PageWrapper title="Create an user">
        <TextInput
          label="User name"
          error={(() => {
            if (userName.length < 3) return "Too short";
          })()}
          value={userName}
          onChangeText={setUserName}
        />
        <CTA
          label="Continue"
          className="w-full mt-2"
          onClick={() =>
            push(`/link-github?user-name=${userName}`)
          }
        />
      </PageWrapper>
    </div>
  );
}
