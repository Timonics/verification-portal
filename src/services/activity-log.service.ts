import type { ActivityLog, ActivityAction, ActivityStatus } from '@/types/activity-logs.types';

const STORAGE_KEY = 'verification_portal_activity_logs';

// Helper to load logs from localStorage
const loadLogs = (): ActivityLog[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return parsed.map((log: any) => ({ ...log, timestamp: new Date(log.timestamp) }));
  } catch {
    return [];
  }
};

// Helper to save logs
const saveLogs = (logs: ActivityLog[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
};

export const activityLogService = {
  // Get all logs (with optional filtering)
  getLogs: async (): Promise<ActivityLog[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return loadLogs();
  },

  // Add a new log entry
  addLog: async (log: Omit<ActivityLog, 'id' | 'timestamp'>): Promise<ActivityLog> => {
    const newLog: ActivityLog = {
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      ...log,
    };
    const current = loadLogs();
    saveLogs([newLog, ...current]); // newest first
    return newLog;
  },

  // Clear all logs (admin only)
  clearLogs: async (): Promise<void> => {
    saveLogs([]);
  },
};