import Sidebar from "@/components/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Sidebar />
      <div className="flex flex-1">
        {/* Main Content */}
        <main className="flex-1 w-full overflow-auto bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
