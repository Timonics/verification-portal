"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShieldCheck,
  FileText,
  ChevronDown,
  UserCheck,
  Building2,
  BarChart3,
  File,
  Phone,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import logo from "../../../public/logo.png";

interface NavItem {
  name: string;
  href?: Url;
  icon: React.ComponentType<{ className?: string }>;
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
        name: "Retrieve NIN with Phone",
        href: "/verifications/nin-phone",
        icon: Phone,
      },
      {
        name: "Upload for NIN Retrieval",
        href: "/verifications/upload-nin",
        icon: File,
      },
      { name: "BVN Verification", href: "/verifications/bvn", icon: UserCheck },
      { name: "CAC Verification", href: "/verifications/cac", icon: Building2 },
      // {
      //   name: "PEP Screening",
      //   href: "/verifications/pep",
      //   icon: AlertTriangle,
      //   comingSoon: false,
      // },
      {
        name: "AML/PEP Screening",
        href: "/verifications/aml",
        icon: BarChart3,
        comingSoon: false,
      },
    ],
  },
  // {
  //   name: "Compliance",
  //   icon: Scale,
  //   children: [

  //   ],
  // },
  {
    name: "API Calls",
    href: "/api-calls",
    icon: Zap,
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
    <aside className="fixed inset-y-0 left-0 z-30 w-72 bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
<Image src={logo} alt="VerifyHub Logo" width={40} height={40} />
            <span className="text-xl font-bold text-primary">VerifyHub</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className={cn(
                        "flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
                        "text-gray-700 hover:bg-gray-50 hover:text-primary",
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform",
                          openMenus.includes(item.name) &&
                            "transform rotate-180",
                        )}
                      />
                    </button>

                    {openMenus.includes(item.name) && (
                      <div className="mt-1 ml-8 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href!}
                            className={cn(
                              "flex items-center px-4 py-2 text-sm rounded-lg transition-colors",
                              pathname === child.href
                                ? "bg-secondary/10 text-secondary font-medium"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                              child.comingSoon &&
                                "opacity-50 cursor-not-allowed",
                            )}
                          >
                            <div className="flex items-center space-x-3">
                              <child.icon className="w-4 h-4" />
                              <span>{child.name}</span>
                              {child.comingSoon && (
                                <span className="px-1.5 py-0.5 text-xs bg-coming-soon/10 text-coming-soon rounded">
                                  Soon
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    className={cn(
                      "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
                      pathname === item.href
                        ? "bg-secondary/10 text-secondary"
                        : "text-gray-700 hover:bg-gray-50 hover:text-primary",
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="px-4 py-3 text-xs text-gray-500">
            <p>🔒 256-bit Encrypted</p>
            <p className="mt-1">📜 NDPR Compliant</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
