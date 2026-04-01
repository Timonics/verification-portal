'use client'

import { LucideIcon } from 'lucide-react'

interface SummaryCardProps {
  title: string
  value: string | number
  change?: number
  trend?: 'up' | 'down'
  icon: LucideIcon
  description?: string
  subtitle?: string
}

export function SummaryCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  description,
  subtitle
}: SummaryCardProps) {
  return (
    <div
      style={{
        backgroundColor: "#ece9d8",
        border: "2px solid",
        borderColor: "#ffffff #808080 #808080 #ffffff",
        boxShadow: "inset -1px -1px 0 #404040, inset 1px 1px 0 #dfdfdf, 2px 2px 0 rgba(0,0,0,0.15)",
        padding: 0,
        overflow: "hidden",
      }}
    >
      {/* Card title bar */}
      <div
        style={{
          background: "linear-gradient(to right, #0a246a 0%, #3a6fc0 60%, #a6caef 100%)",
          padding: "2px 6px",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Icon size={12} color="#ffffff" />
        <span style={{ fontSize: 11, fontWeight: "bold", color: "#ffffff" }}>
          {title}
        </span>
      </div>

      {/* Card body */}
      <div style={{ padding: "8px 10px" }}>
        <div
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#000000",
            fontFamily: "Tahoma, Arial, sans-serif",
            lineHeight: 1.2,
            marginBottom: 4,
          }}
        >
          {value}
        </div>

        {change !== undefined && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
            <span
              style={{
                fontSize: 10,
                padding: "1px 4px",
                backgroundColor: trend === 'up' ? "#d4edda" : "#f8d7da",
                color: trend === 'up' ? "#005500" : "#880000",
                border: `1px solid ${trend === 'up' ? "#c3e6cb" : "#f5c6cb"}`,
                fontWeight: "bold",
              }}
            >
              {trend === 'up' ? '▲' : '▼'} {Math.abs(change)}%
            </span>
            {subtitle && (
              <span style={{ fontSize: 10, color: "#666666" }}>{subtitle}</span>
            )}
          </div>
        )}

        {description && (
          <div
            style={{
              fontSize: 10,
              color: "#666666",
              borderTop: "1px solid #d4d0c8",
              paddingTop: 4,
              marginTop: 4,
            }}
          >
            {description}
          </div>
        )}
      </div>
    </div>
  )
}
