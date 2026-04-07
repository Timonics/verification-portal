import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { amlService } from "@/services/aml.service";
import type { AmlRequest, AmlResponse } from "@/types/aml.types";
import { useAddActivityLog } from "./useActivityLogs";

export function useAmlScreening() {
    const { mutate: addLog } = useAddActivityLog();
  return useMutation<AmlResponse, Error, AmlRequest>({
    mutationFn: (data) => amlService.screen(data),
    onSuccess: (data) => {
      if (data.success) {
        addLog({
          action: "AML_SCREENING",
          status: "SUCCESS",
          userEmail: "admin@josbiz.com",
          // ipAddress can be obtained from request
        });
        toast.success("Screening completed", {
          description: `Risk level: ${data.data?.risk_level} | Match: ${data.data?.match_status}`,
        });
      } else if (data.service_down) {
        toast.error("Service unavailable", { description: data.message });
      } else {
        toast.error("Screening failed", { description: data.message });
      }
    },
    onError: (error) => {
      toast.error("Request failed", { description: error.message });
    },
  });
}
