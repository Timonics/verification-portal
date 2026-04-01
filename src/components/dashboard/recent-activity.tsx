'use client'

import {
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
  CreditCard,
  Building2,
  Eye,
} from 'lucide-react'

const recentActivities = [
  {
    id: 1,
    service: 'NIN Verification',
    status: 'success',
    timestamp: '2 minutes ago',
    reference: 'NIN_REF_001',
    user: 'Insurance Onboarding App',
    icon: UserCheck,
  },
  {
    id: 2,
    service: 'BVN Verification',
    status: 'success',
    timestamp: '5 minutes ago',
    reference: 'BVN_REF_002',
    user: 'Insurance Onboarding App',
    icon: CreditCard,
  },
  {
    id: 3,
    service: 'BVN Verification',
    status: 'failed',
    timestamp: '7 minutes ago',
    reference: 'BVN_REF_003',
    user: 'Insurance Onboarding App',
    icon: CreditCard,
  },
  {
    id: 4,
    service: 'CAC Verification',
    status: 'success',
    timestamp: '12 minutes ago',
    reference: 'CAC_REF_004',
    user: 'Fintech Ltd',
    icon: Building2,
  },
  {
    id: 5,
    service: 'NIN Verification',
    status: 'success',
    timestamp: '15 minutes ago',
    reference: 'NIN_REF_005',
    user: 'Banking Corp',
    icon: UserCheck,
  }
]

export function RecentActivity() {
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
      {/* Title bar */}
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
          Recent Activity — Latest verifications from your apps
        </span>
        <button
          style={{
            backgroundColor: "#ece9d8",
            border: "2px solid",
            borderColor: "#ffffff #808080 #808080 #ffffff",
            boxShadow: "inset -1px -1px 0 #404040",
            fontSize: 10,
            padding: "1px 6px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 3,
            color: "#000000",
          }}
        >
          <Eye size={10} />
          View All
        </button>
      </div>

      {/* Toolbar / column headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "32px 1fr 120px 150px 100px 80px",
          backgroundColor: "#d4d0c8",
          borderBottom: "2px solid",
          borderBottomColor: "#808080 #ffffff #ffffff #808080",
          padding: "2px 0",
        }}
      >
        {["", "Service", "Status", "Application", "Reference", "Time"].map((col) => (
          <div
            key={col}
            style={{
              fontSize: 11,
              fontWeight: "bold",
              padding: "2px 6px",
              color: "#000000",
              borderRight: "1px solid #808080",
              userSelect: "none",
              cursor: "default",
            }}
          >
            {col}
          </div>
        ))}
      </div>

      {/* Table rows */}
      <div>
        {recentActivities.map((activity, index) => (
          <div
            key={activity.id}
            style={{
              display: "grid",
              gridTemplateColumns: "32px 1fr 120px 150px 100px 80px",
              backgroundColor: index % 2 === 0 ? "#ffffff" : "#f0efe8",
              borderBottom: "1px solid #e0e0e0",
              alignItems: "center",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.backgroundColor = "#0a246a";
              const spans = (e.currentTarget as HTMLDivElement).querySelectorAll('span, div');
              spans.forEach((el) => {
                (el as HTMLElement).style.color = "#ffffff";
              });
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.backgroundColor = index % 2 === 0 ? "#ffffff" : "#f0efe8";
              const spans = (e.currentTarget as HTMLDivElement).querySelectorAll('span, div');
              spans.forEach((el) => {
                (el as HTMLElement).style.color = "";
              });
            }}
          >
            {/* Icon cell */}
            <div
              style={{
                padding: "3px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRight: "1px solid #e0e0e0",
              }}
            >
              <activity.icon size={14} color="#0a246a" />
            </div>

            {/* Service name */}
            <div
              style={{
                padding: "3px 6px",
                fontSize: 11,
                fontWeight: "bold",
                borderRight: "1px solid #e0e0e0",
              }}
            >
              {activity.service}
            </div>

            {/* Status */}
            <div
              style={{
                padding: "3px 6px",
                borderRight: "1px solid #e0e0e0",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  padding: "1px 4px",
                  backgroundColor:
                    activity.status === 'success' ? "#008000" : "#cc0000",
                  color: "#ffffff",
                  border: `1px solid ${activity.status === 'success' ? "#005500" : "#880000"}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {activity.status === 'success' ? (
                  <CheckCircle size={9} />
                ) : (
                  <XCircle size={9} />
                )}
                {activity.status === 'success' ? 'Success' : 'Failed'}
              </span>
            </div>

            {/* Application */}
            <div
              style={{
                padding: "3px 6px",
                fontSize: 11,
                color: "#444444",
                borderRight: "1px solid #e0e0e0",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {activity.user}
            </div>

            {/* Reference */}
            <div
              style={{
                padding: "3px 6px",
                fontSize: 10,
                fontFamily: "Courier New, monospace",
                color: "#000066",
                borderRight: "1px solid #e0e0e0",
              }}
            >
              {activity.reference}
            </div>

            {/* Time */}
            <div
              style={{
                padding: "3px 6px",
                fontSize: 10,
                color: "#666666",
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Clock size={9} />
              {activity.timestamp}
            </div>
          </div>
        ))}
      </div>

      {/* Status bar */}
      <div
        style={{
          borderTop: "2px solid",
          borderTopColor: "#808080",
          boxShadow: "0 -1px 0 #dfdfdf",
          backgroundColor: "#d4d0c8",
          padding: "2px 8px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 10,
          color: "#444444",
        }}
      >
        <span>{recentActivities.length} object(s)</span>
        <span
          style={{
            borderLeft: "1px solid #808080",
            paddingLeft: 8,
          }}
        >
          {recentActivities.filter((a) => a.status === 'success').length} successful
        </span>
        <span
          style={{
            borderLeft: "1px solid #808080",
            paddingLeft: 8,
          }}
        >
          {recentActivities.filter((a) => a.status === 'failed').length} failed
        </span>
      </div>
    </div>
  )
}
