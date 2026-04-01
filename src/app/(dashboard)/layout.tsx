import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verification Dashboard",
  description:
    "A comprehensive dashboard for managing and monitoring all your verification activities, including NIN, BVN, CAC, PEP, and AML screenings.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-72 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
