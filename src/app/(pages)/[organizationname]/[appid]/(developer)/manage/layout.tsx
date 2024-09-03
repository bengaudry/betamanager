import { AuthGuarded } from "@/components/Barriers";
import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { appid: string; organizationname: string };
}>) {
  return (
    <AuthGuarded
      href={`/signin?redirect-uri=/${params.organizationname}/${params.appid}/manage`}
    >
      <div className="flex flex-row items-center w-full h-screen">
        <Sidebar />
        <div className="h-full w-full overflow-y-auto">{children}</div>
      </div>
    </AuthGuarded>
  );
}
