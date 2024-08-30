import { PageWrapper } from "@/components/PageWrapper";
import { getBaseUrl } from "@/lib/utils";

export default async function ProjectsPage({
  params,
}: {
  params: { organizationname: string };
}) {
  const res = await fetch(
    `${getBaseUrl()}/api/organization-projects?organization-name=${
      params.organizationname
    }`
  );
  const projects = await res.json() as Project[];

  return <PageWrapper title="Projects">
    {projects.map(({ name }) => {
        return <div key={name}>{name}</div>;
    })}
  </PageWrapper>
}
