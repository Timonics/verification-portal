import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { cacService } from "@/services/cac.service";
import type {
  CacVerificationRequest,
  CacVerificationResponse,
} from "@/types/cac.types";
import { useAddActivityLog } from "./useActivityLogs";

export function useCacVerification() {
  const { mutate: addLog } = useAddActivityLog();
  return useMutation<CacVerificationResponse, Error, CacVerificationRequest>({
    mutationFn: (data) => cacService.verifyCompany(data),
    onSuccess: (data) => {
      if (data.success) {
        addLog({
          action: "CAC_SEARCH",
          status: "SUCCESS",
          userEmail: "admin@josbiz.com",
          // ipAddress can be obtained from request
        });

        toast.success("Company Found", {
          description: "Business details retrieved successfully.",
        });
      } else if (data.service_down) {
        toast.error("Service Unavailable", {
          description: data.message || "CAC service is temporarily down.",
        });
      } else {
        toast.error("Company Not Found", {
          description: data.message || "No company found with that RC number.",
        });
      }
    },
    onError: (error) => {
      toast.error("Request Failed", {
        description: error.message || "An unexpected error occurred.",
      });
    },
  });
}
