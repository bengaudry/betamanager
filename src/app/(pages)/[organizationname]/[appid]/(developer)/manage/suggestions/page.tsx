import { PageWrapper } from "@/components/PageWrapper";
import { getBaseUrl } from "@/lib/utils";

export default async function SuggestionsPage() {
  const res = await fetch(`${getBaseUrl()}/api/project-suggestions`)
  const suggestions = await res.json();

  return (
    <PageWrapper
      title="Suggestions"
      subtitle="Here you can find all the improvments that you can make to your app that have been suggested by your testers"
    >
      {JSON.stringify(suggestions)}
    </PageWrapper>
  );
}
