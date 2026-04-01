'use client'

import Link from 'next/link'
import {
  UserCheck,
  CreditCard,
  Building2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react'

const actions = [
  {
    title: 'NIN Verification',
    description: 'Verify National Identity Number',
    icon: UserCheck,
    href: '/verifications/nin',
    popular: true
  },
  {
    title: 'BVN Verification',
    description: 'Verify Bank Verification Number',
    icon: CreditCard,
    href: '/verifications/bvn',
  },
  {
    title: 'CAC Business Search',
    description: 'Search Nigerian businesses',
    icon: Building2,
    href: '/verifications/cac',
  },
  {
    title: 'PEP Screening',
    description: 'Politically Exposed Persons',
    icon: AlertTriangle,
    href: '/pep',
    comingSoon: true
  }
]

export function QuickActions() {
  return (
    <div
      style={{
        backgroundColor: "#ece9d8",
        border: "2px solid",
        borderColor: "#ffffff #808080 #808080 #ffffff",
        boxShadow: "inset -1px -1px 0 #404040, inset 1px 1px 0 #dfdfdf",
        overflow: "hidden",
      }}
    >
      {/* Win2K group box title bar */}
      <div
        style={{
          background: "linear-gradient(to right, #0a246a 0%, #3a6fc0 60%, #a6caef 100%)",
          padding: "3px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 11, fontWeight: "bold", color: "#ffffff" }}>
          Quick Actions — Start a new verification
        </span>
        <span
          style={{
            fontSize: 10,
            backgroundColor: "#ece9d8",
            color: "#0a246a",
            padding: "0 6px",
            border: "1px solid #808080",
            fontWeight: "bold",
          }}
        >
          ⚡ Instant Results
        </span>
      </div>

      {/* Toolbar separator */}
      <div
        style={{
          borderBottom: "1px solid #808080",
          boxShadow: "0 1px 0 #ffffff",
          margin: 0,
        }}
      />

      {/* Action cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 8,
          padding: 8,
        }}
      >
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.comingSoon ? '#' : action.href}
            style={{ textDecoration: "none", pointerEvents: action.comingSoon ? "none" : "auto" }}
          >
            <div
              style={{
                backgroundColor: action.comingSoon ? "#d4d0c8" : "#ece9d8",
                border: "2px solid",
                borderColor: "#ffffff #808080 #808080 #ffffff",
                boxShadow: "inset -1px -1px 0 #404040, inset 1px 1px 0 #dfdfdf",
                padding: "8px",
                textAlign: "center",
                cursor: action.comingSoon ? "not-allowed" : "pointer",
                opacity: action.comingSoon ? 0.6 : 1,
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (!action.comingSoon) {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor = "#d4d0c8";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "#808080 #ffffff #ffffff #808080";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "inset 1px 1px 0 #404040, inset -1px -1px 0 #dfdfdf";
                }
              }}
              onMouseLeave={(e) => {
                if (!action.comingSoon) {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor = "#ece9d8";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "#ffffff #808080 #808080 #ffffff";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "inset -1px -1px 0 #404040, inset 1px 1px 0 #dfdfdf";
                }
              }}
            >
              {action.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: -1,
                    right: -1,
                    backgroundColor: "#0a246a",
                    color: "#ffffff",
                    fontSize: 9,
                    padding: "1px 4px",
                    fontWeight: "bold",
                    border: "1px solid #000033",
                  }}
                >
                  ★ Popular
                </div>
              )}

              {action.comingSoon && (
                <div
                  style={{
                    position: "absolute",
                    top: -1,
                    right: -1,
                    backgroundColor: "#7b3fc4",
                    color: "#ffffff",
                    fontSize: 9,
                    padding: "1px 4px",
                    fontWeight: "bold",
                    border: "1px solid #5a2e99",
                  }}
                >
                  Coming Soon
                </div>
              )}

              {/* Icon */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor: "#d4d0c8",
                  border: "1px solid #808080",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 6px auto",
                }}
              >
                <action.icon size={18} color={action.comingSoon ? "#808080" : "#0a246a"} />
              </div>

              <div
                style={{
                  fontSize: 11,
                  fontWeight: "bold",
                  color: "#000000",
                  marginBottom: 3,
                }}
              >
                {action.title}
              </div>
              <div style={{ fontSize: 10, color: "#555555", marginBottom: 6 }}>
                {action.description}
              </div>

              {!action.comingSoon && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 3,
                    fontSize: 10,
                    color: "#0a246a",
                    borderTop: "1px solid #c0c0c0",
                    paddingTop: 4,
                    fontWeight: "bold",
                  }}
                >
                  Verify Now <ArrowRight size={10} />
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
