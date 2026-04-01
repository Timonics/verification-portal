"use client";

import { Search, Bell, User, ChevronDown } from "lucide-react";
import { useState } from "react";

export function Topbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 48,
        padding: "0 8px",
        backgroundColor: "#ece9d8",
        borderBottom: "2px solid",
        borderBottomColor: "#808080",
        boxShadow: "0 1px 0 #404040",
        gap: 8,
      }}
    >
      {/* Toolbar buttons area (left) */}
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {/* Win2K-style toolbar separator */}
        <div
          style={{
            width: 1,
            height: 22,
            backgroundColor: "#808080",
            margin: "0 2px",
          }}
        />
        <div
          style={{
            width: 1,
            height: 22,
            backgroundColor: "#ffffff",
            marginLeft: -3,
            marginRight: 4,
          }}
        />

        {/* Address-bar style search */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: "#000000",
              marginRight: 4,
              fontWeight: "bold",
            }}
          >
            Search:
          </span>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              placeholder="Search across logs..."
              style={{
                width: 220,
                height: 20,
                padding: "1px 20px 1px 4px",
                fontSize: 11,
                fontFamily: "Tahoma, Arial, sans-serif",
                backgroundColor: "#ffffff",
                border: "2px solid",
                borderColor: "#808080 #ffffff #ffffff #808080",
                boxShadow: "inset 1px 1px 0 #404040",
                outline: "none",
                color: "#000000",
              }}
            />
            <button
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: 20,
                backgroundColor: "#ece9d8",
                border: "none",
                borderLeft: "1px solid #808080",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Search size={11} />
            </button>
          </div>
        </div>
      </div>

      {/* Right controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {/* Notification button */}
        <div style={{ position: "relative" }}>
          <button
            className="win-button"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "2px 6px",
              minHeight: 22,
              position: "relative",
            }}
          >
            <Bell size={13} />
            <span style={{ fontSize: 11 }}>Alerts</span>
            {/* Red notification dot */}
            <span
              style={{
                position: "absolute",
                top: 2,
                right: 2,
                width: 6,
                height: 6,
                backgroundColor: "#cc0000",
                borderRadius: "50%",
                border: "1px solid #880000",
              }}
            />
          </button>
        </div>

        {/* Separator */}
        <div
          style={{
            width: 1,
            height: 22,
            backgroundColor: "#808080",
            margin: "0 2px",
          }}
        />
        <div
          style={{
            width: 1,
            height: 22,
            backgroundColor: "#ffffff",
            marginLeft: -3,
          }}
        />

        {/* User dropdown */}
        <div style={{ position: "relative" }}>
          <button
            className="win-button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "2px 6px",
              minHeight: 22,
            }}
          >
            {/* Win2K user icon */}
            <div
              style={{
                width: 16,
                height: 16,
                backgroundColor: "#0a246a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #808080",
              }}
            >
              <User size={10} color="#ffffff" />
            </div>
            <span style={{ fontSize: 11 }}>Admin User</span>
            <ChevronDown size={10} />
          </button>

          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                backgroundColor: "#ece9d8",
                border: "2px solid",
                borderColor: "#ffffff #404040 #404040 #ffffff",
                outline: "1px solid #808080",
                minWidth: 160,
                zIndex: 100,
                boxShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              {/* Dropdown header */}
              <div
                style={{
                  padding: "4px 8px 4px 8px",
                  borderBottom: "1px solid #808080",
                  backgroundColor: "#ece9d8",
                }}
              >
                <div style={{ fontSize: 11, fontWeight: "bold" }}>
                  Admin User
                </div>
                <div style={{ fontSize: 10, color: "#444444" }}>
                  admin@verifyhub.com
                </div>
              </div>
              {["Settings", "Logout"].map((item) => (
                <button
                  key={item}
                  onClick={() => setDropdownOpen(false)}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "3px 16px",
                    fontSize: 11,
                    textAlign: "left",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#000000",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0a246a";
                    (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color = "#000000";
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
