import { DashboardLayoutContent } from "@/components/DashboardLayoutContent";
import { Navbar } from "@/components/Navbar";
import { ProjectDataProvider } from "@/components/Providers/ProjectDataProvider";
import { Sidebar } from "@/components/Sidebar";
import { auth } from "@/lib/auth";

export default async function DashboardLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { appname: string; username: string };
}>) {
  const session = await auth();

  return (
    <ProjectDataProvider projectName={params.appname as string}>
      <DashboardLayoutContent params={params} userId={session?.user?.id ?? ""}>
        <Navbar session={session} username={params.username as string} />
        <div className="flex flex-row items-center w-full h-full">
          <Sidebar />
          <div className="h-full w-full overflow-y-auto">{children}</div>
        </div>
      </DashboardLayoutContent>
    </ProjectDataProvider>
  );
}
