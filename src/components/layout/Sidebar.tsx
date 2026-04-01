"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShieldCheck,
  Scale,
  FileText,
  ChevronDown,
  UserCheck,
  Building2,
  AlertTriangle,
  BarChart3,
  Monitor,
  Lock,
} from "lucide-react";
import { useState } from "react";
import { Url } from "next/dist/shared/lib/router/router";

interface NavItem {
  name: string;
  href?: Url;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  children?: NavItem[];
  comingSoon?: boolean;
}

const navigation: NavItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Verifications",
    icon: ShieldCheck,
    children: [
      { name: "NIN Verification", href: "/verifications/nin", icon: UserCheck },
      {
        name: "NIN with Phone",
        href: "/verifications/nin-phone",
        icon: UserCheck,
      },
      { name: "BVN Verification", href: "/verifications/bvn", icon: UserCheck },
      {
        name: "BVN with Phone",
        href: "/verifications/bvn-phone",
        icon: UserCheck,
      },
      { name: "CAC Verification", href: "/verifications/cac", icon: Building2 },
    ],
  },
  {
    name: "Compliance",
    icon: Scale,
    children: [
      {
        name: "PEP Screening",
        href: "/pep",
        icon: AlertTriangle,
        comingSoon: true,
      },
      {
        name: "AML Screening",
        href: "/aml",
        icon: BarChart3,
        comingSoon: true,
      },
    ],
  },
  {
    name: "Logs",
    href: "/logs",
    icon: FileText,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>(["Verifications"]);

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name],
    );
  };

  return (
    <aside
      className="fixed inset-y-0 left-0 z-30 w-64"
      style={{
        backgroundColor: "#ece9d8",
        borderRight: "2px solid",
        borderRightColor: "#808080",
        boxShadow: "2px 0 0 #404040",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Logo / Title area */}
      <div
        className="win-titlebar flex items-center gap-2 px-3 py-2"
        style={{ minHeight: 32, flexShrink: 0 }}
      >
        <Monitor size={16} className="text-white" />
        <span style={{ fontSize: 12, fontWeight: "bold", color: "#ffffff" }}>
          VerifyHub Portal
        </span>
      </div>

      {/* Blue banner under titlebar */}
      <div
        style={{
          background: "linear-gradient(to bottom, #1e5fb5 0%, #3a82d8 100%)",
          padding: "6px 10px",
          borderBottom: "1px solid #0a246a",
          flexShrink: 0,
        }}
      >
        <div style={{ fontSize: 10, color: "#d0e8ff", marginBottom: 2 }}>
          Identity &amp; Compliance
        </div>
        <div style={{ fontSize: 11, color: "#ffffff", fontWeight: "bold" }}>
          Verification Dashboard
        </div>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 overflow-y-auto"
        style={{ padding: "4px 0", backgroundColor: "#ece9d8" }}
      >
        {/* Section label */}
        <div
          style={{
            fontSize: 10,
            fontWeight: "bold",
            color: "#0a246a",
            padding: "6px 8px 2px 8px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Navigation
        </div>

        <div
          style={{
            borderBottom: "1px solid #c0c0c0",
            margin: "2px 6px 4px 6px",
          }}
        />

        {navigation.map((item) => (
          <div key={item.name}>
            {item.children ? (
              <div>
                <button
                  onClick={() => toggleMenu(item.name)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "3px 8px",
                    fontSize: 11,
                    fontWeight: "bold",
                    color: "#000000",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#d4d0c8";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <item.icon size={14} />
                    <span>{item.name}</span>
                  </div>
                  <ChevronDown
                    size={12}
                    style={{
                      transform: openMenus.includes(item.name)
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  />
                </button>

                {openMenus.includes(item.name) && (
                  <div
                    style={{
                      marginLeft: 16,
                      borderLeft: "1px solid #808080",
                      marginBottom: 2,
                    }}
                  >
                    {item.children.map((child) => {
                      const isActive = pathname === child.href;
                      return (
                        <Link
                          key={child.name}
                          href={child.href!}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "3px 8px",
                            fontSize: 11,
                            color: child.comingSoon
                              ? "#808080"
                              : isActive
                              ? "#ffffff"
                              : "#000000",
                            backgroundColor: isActive ? "#0a246a" : "transparent",
                            textDecoration: "none",
                            pointerEvents: child.comingSoon ? "none" : "auto",
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive && !child.comingSoon) {
                              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#0a246a";
                              (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive && !child.comingSoon) {
                              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                              (e.currentTarget as HTMLAnchorElement).style.color = "#000000";
                            }
                          }}
                        >
                          <child.icon size={12} />
                          <span>{child.name}</span>
                          {child.comingSoon && (
                            <span
                              style={{
                                fontSize: 9,
                                backgroundColor: "#7b3fc4",
                                color: "#ffffff",
                                padding: "0 3px",
                                border: "1px solid #5a2e99",
                              }}
                            >
                              Soon
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={item.href!}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "3px 8px",
                  fontSize: 11,
                  fontWeight: "bold",
                  color: pathname === item.href ? "#ffffff" : "#000000",
                  backgroundColor:
                    pathname === item.href ? "#0a246a" : "transparent",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  if (pathname !== item.href) {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#d4d0c8";
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== item.href) {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                  }
                }}
              >
                <item.icon size={14} />
                <span>{item.name}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Footer / Status bar */}
      <div
        style={{
          borderTop: "2px solid",
          borderTopColor: "#808080",
          boxShadow: "0 -1px 0 #ffffff",
          backgroundColor: "#ece9d8",
          padding: "4px 8px",
          fontSize: 10,
          color: "#444444",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginBottom: 2,
          }}
        >
          <Lock size={10} />
          <span>256-bit Encrypted</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <ShieldCheck size={10} />
          <span>NDPR Compliant</span>
        </div>
      </div>
    </aside>
  );
}
