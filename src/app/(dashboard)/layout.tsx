import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "VerifyHub - Verification Dashboard",
  description:
    "Identity & Compliance Verification Portal for NIN, BVN, CAC, PEP, and AML screenings.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ backgroundColor: "#3a6ea5" }}
    >
      <Sidebar />
      <div
        className="flex flex-col flex-1 overflow-hidden"
        style={{ marginLeft: 256 }}
      >
        <Topbar />
        <main
          className="flex-1 overflow-y-auto"
          style={{ backgroundColor: "#ece9d8" }}
        >
          <div style={{ padding: "8px" }}>{children}</div>
        </main>
        {/* Windows 2000 style taskbar/status bar at bottom */}
        <div
          style={{
            backgroundColor: "#ece9d8",
            borderTop: "2px solid",
            borderTopColor: "#ffffff",
            borderBottom: "1px solid #808080",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "2px 8px",
            height: 22,
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 10, color: "#444444" }}>
            VerifyHub Portal v2.0 — Identity &amp; Compliance System
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontSize: 10,
                color: "#008000",
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: "#008000",
                  display: "inline-block",
                  border: "1px solid #005500",
                }}
              />
              API: Connected
            </span>
            <span
              style={{
                fontSize: 10,
                color: "#444444",
                borderLeft: "1px solid #808080",
                paddingLeft: 8,
              }}
            >
              Mar 27, 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
