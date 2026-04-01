import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Verification Portal",
  description:
    "Secure login page for the Verification Portal, providing access to NIN, BVN, CAC, PEP, and AML verification dashboards and tools.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
