"use client";

import { useState, useEffect } from "react";
import { Calendar, Zap } from "lucide-react";

export default function DateBadge() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const formatted = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    setCurrentDate(formatted);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-100 text-sm text-gray-500">
        <Calendar className="w-4 h-4" />
        <span>{currentDate}</span>
      </div>
      <div className="flex items-center gap-2 px-3 py-2 bg-teal-50 rounded-lg text-sm text-teal-600">
        <Zap className="w-4 h-4" />
        <span>Live</span>
      </div>
    </div>
  );
}
