import { AuthGuarded } from "@/components/Barriers";
import { Navbar } from "@/components/Navbar";
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
    <AuthGuarded
      href={`/signin?redirect-uri=/${params.username}/${params.appname}/manage`}
    >
      <div className="flex flex-col w-full h-screen">
        <Navbar session={session} username={params.username} />
        <div className="flex flex-row items-center w-full h-full">
          <Sidebar />
          <div className="h-full w-full overflow-y-auto">{children}</div>
        </div>
      </div>
    </AuthGuarded>
  );
}
