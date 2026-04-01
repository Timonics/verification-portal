import {
  BarChart3,
  Building2,
  CreditCard,
  Globe,
  Lock,
  Shield,
  Users,
  Zap,
} from "lucide-react";

// Data for services
export const services = [
  {
    title: "NIN Verification",
    description:
      "Verify National Identity Number instantly with full name, DOB, and phone number.",
    price: "From ₦80",
    icon: Shield,
  },
  {
    title: "BVN Verification",
    description:
      "Bank Verification Number verification with biometric data and personal details.",
    price: "From ₦50",
    icon: CreditCard,
  },
  {
    title: "CAC Business Search",
    description:
      "Search and verify Nigerian businesses by RC number or company name.",
    price: "From ₦150",
    icon: Building2,
  },
  {
    title: "PEP Screening",
    description:
      "Screen against global Politically Exposed Persons watchlists.",
    price: "Coming Soon",
    icon: Globe,
  },
  {
    title: "AML Monitoring",
    description:
      "Anti-Money Laundering compliance checks and ongoing monitoring.",
    price: "Coming Soon",
    icon: BarChart3,
  },
  {
    title: "Bulk Verification",
    description:
      "Verify multiple identities at once with our batch processing API.",
    price: "Custom Pricing",
    icon: Users,
  },
];

// Data for features
export const features = [
  {
    title: "Real-time Verification",
    description:
      "Get instant results with our high-speed API and real-time data validation.",
    icon: Zap,
  },
  {
    title: "Enterprise Security",
    description:
      "256-bit encryption, NDPR compliant, and SOC2 certified infrastructure.",
    icon: Lock,
  },
  {
    title: "Detailed Analytics",
    description:
      "Track usage, success rates, and costs with comprehensive dashboards.",
    icon: BarChart3,
  },
  {
    title: "Developer Friendly",
    description:
      "RESTful API with comprehensive documentation and SDKs for all languages.",
    icon: Globe,
  },
];
