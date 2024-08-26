import { AuthGuarded } from "@/components/Barriers";
import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuarded>
      <div className="flex flex-row items-center w-full h-screen">
        <Sidebar />
        <div className="h-full w-full overflow-y-auto">{children}</div>
      </div>
    </AuthGuarded>
  );
}
