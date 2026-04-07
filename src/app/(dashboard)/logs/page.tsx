'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Trash2, RefreshCw } from 'lucide-react';
import { useActivityLogs, useClearActivityLogs } from '@/hooks/useActivityLogs';
import { ActivityLogsTable } from '@/components/logs/activity-logs-table';
import { ActivityLogDetailModal } from '@/components/logs/activity-log-detail';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ActivityLogsPage() {
  const { data: logs = [], isLoading, refetch } = useActivityLogs();
  const { mutate: clearLogs, isPending: isClearing } = useClearActivityLogs();
  const [selectedLog, setSelectedLog] = useState<any>(null);

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all activity logs? This action cannot be undone.')) {
      clearLogs(undefined, {
        onSuccess: () => toast.success('All logs cleared'),
        onError: () => toast.error('Failed to clear logs'),
      });
    }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2"><div className="p-2 bg-blue-100 rounded-lg"><Activity className="w-6 h-6 text-blue-600" /></div><h1 className="text-2xl font-bold text-gray-900">Activity Logs</h1></div>
          <p className="text-gray-600">Track all user actions within the portal – logins, verifications, screenings, and more.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => refetch()} disabled={isLoading} className="gap-2"><RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} /> Refresh</Button>
          <Button variant="destructive" onClick={handleClear} disabled={isClearing} className="gap-2"><Trash2 className="w-4 h-4" /> Clear All</Button>
        </div>
      </motion.div>

      <ActivityLogsTable logs={logs} isLoading={isLoading} onViewDetails={setSelectedLog} />
      <ActivityLogDetailModal log={selectedLog} open={!!selectedLog} onClose={() => setSelectedLog(null)} />
    </div>
  );
}