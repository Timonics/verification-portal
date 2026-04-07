import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify OTP | Verification Portal",
  description:
    "Enter the OTP sent to your email to complete the login process and access your account.",
};

export default function VerifyOTPLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
