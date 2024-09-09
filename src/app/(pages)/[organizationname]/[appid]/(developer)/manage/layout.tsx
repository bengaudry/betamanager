import { AuthGuarded } from "@/components/Barriers";
import { Navbar, Sidebar } from "@/components/Sidebar";
import { auth } from "@/lib/auth";

export default async function DashboardLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { appid: string; organizationname: string };
}>) {
  const session = await auth();

  return (
    <AuthGuarded
      href={`/signin?redirect-uri=/${params.organizationname}/${params.appid}/manage`}
    >
      <div className="flex flex-col w-full h-screen">
        <Navbar session={session} />
        <div className="flex flex-row items-center w-full h-full">
          <Sidebar />
          <div className="h-full w-full overflow-y-auto">{children}</div>
        </div>
      </div>
    </AuthGuarded>
  );
}
