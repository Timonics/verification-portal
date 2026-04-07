"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, FileText, Clock, User, Activity } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import type { ActivityLog } from "@/types/activity-logs.types";
import { Badge } from "../ui/badge";

interface ActivityLogDetailModalProps {
  log: ActivityLog | null;
  open: boolean;
  onClose: () => void;
}

export function ActivityLogDetailModal({
  log,
  open,
  onClose,
}: ActivityLogDetailModalProps) {
  const [copied, setCopied] = useState(false);
  if (!log) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Activity Details
                  </h2>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Action</p>
                    <Badge className="mt-1">
                      {log.action.replace(/_/g, " ")}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <Badge
                      className={
                        log.status === "SUCCESS"
                          ? "bg-green-100 text-green-700 mt-1"
                          : "bg-red-100 text-red-700 mt-1"
                      }
                    >
                      {log.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Timestamp</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span>{formatDate(log.timestamp)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">User Email</p>
                    <div className="flex items-center gap-2 mt-1">
                      <User className="w-3 h-3 text-gray-400" />
                      <span>{log.userEmail || "admin@verifyhub.com"}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">IP Address</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span>{log.ipAddress || "127.0.0.1"}</span>
                      <button
                        onClick={() =>
                          copyToClipboard(log.ipAddress || "127.0.0.1")
                        }
                      >
                        {copied ? (
                          <Check className="w-3 h-3 text-green-500" />
                        ) : (
                          <Copy className="w-3 h-3 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Log ID</p>
                    <div className="flex items-center gap-2 mt-1">
                      <FileText className="w-3 h-3 text-gray-400" />
                      <span className="font-mono text-xs">{log.id}</span>
                      <button onClick={() => copyToClipboard(log.id)}>
                        {copied ? (
                          <Check className="w-3 h-3 text-green-500" />
                        ) : (
                          <Copy className="w-3 h-3 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                {log.details && (
                  <div className="border-t pt-4">
                    <p className="text-xs text-gray-500 mb-2">
                      Additional Details
                    </p>
                    <pre className="bg-gray-50 rounded-lg p-3 text-xs overflow-auto">
                      {JSON.stringify(log.details, null, 2)}
                    </pre>
                  </div>
                )}
                <div className="flex justify-end">
                  <Button variant="outline" onClick={onClose}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
