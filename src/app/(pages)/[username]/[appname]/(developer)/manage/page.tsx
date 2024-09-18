import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { getBaseUrl } from "@/lib/utils";
import { PageWrapper } from "@/components/PageWrapper";
import { CodeDisplayer } from "@/components/CodeDisplayer";

export default async function DashboardPage({
  params,
}: {
  params: { username: string; appname: string };
}) {
  const { appname, username } = params;

  const project = await prisma.project.findFirst({
    where: {
      name: appname,
      userName: username,
    },
  });

  const relatedIssuesNb = await prisma.issue.count({
    where: {
      projectId: project?.id,
    }
  })

  if (!project) redirect("/");

  const code = `function TesterSpace () {
    const MY_LAUNCHFLOW_API_KEY = "***********************";
    const [launchflowToken, setLaunchflowToken] = useState<string | null>(null);

    useEffect(() => {
        fetch("${getBaseUrl()}/api/generate-app-token", {
            method: "GET",
            headers: {
                "Authorization": \`Bearer \${MY_LAUNCHFLOW_API_KEY}\`,
            }
        })
            .then((res) => res.json())
            .then((value) => {
              if ("error" in value) throw Error(value.error);
              setLaunchflowToken(value.token);
            }
            .catch((err) => {
                console.error(err);
                setLaunchflowToken(null);
            })
    }, [])
      
    return <iframe src={\`${getBaseUrl()}/${username}/${appname}?token=\${launchflowToken}\`} />;
}`;

  return (
    <PageWrapper title="Dashboard">
      <p>{relatedIssuesNb} issues</p>
      <CodeDisplayer code={code} language="js" />
    </PageWrapper>
  );
}
