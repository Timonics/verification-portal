import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { activityLogService } from '@/services/activity-log.service';
import type { ActivityAction, ActivityStatus } from '@/types/activity-logs.types';

export const activityLogKeys = {
  all: ['activity-logs'] as const,
};

export function useActivityLogs() {
  return useQuery({
    queryKey: activityLogKeys.all,
    queryFn: () => activityLogService.getLogs(),
  });
}

export function useAddActivityLog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { action: ActivityAction; status: ActivityStatus; details?: any; userEmail?: string; ipAddress?: string }) =>
      activityLogService.addLog(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: activityLogKeys.all });
    },
  });
}

export function useClearActivityLogs() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => activityLogService.clearLogs(),
    onSuccess: () => {
      queryClient.setQueryData(activityLogKeys.all, []);
    },
  });
}