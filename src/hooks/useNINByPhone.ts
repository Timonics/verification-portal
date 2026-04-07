import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ninService } from "@/services/nin.service";
import type { NinByPhoneResponse } from "@/types/nin.types";
import { useAddActivityLog } from "./useActivityLogs";

export function useNinByPhone() {
  const { mutate: addLog } = useAddActivityLog();
  return useMutation<NinByPhoneResponse, Error, string>({
    mutationFn: (phoneNumber: string) =>
      ninService.verifyNINByPhone(phoneNumber),
    onSuccess: (data) => {
      if (data.success) {
        addLog({
          action: "NIN_PHONE_VERIFICATION",
          status: "SUCCESS",
          userEmail: "admin@josbiz.com",
          // ipAddress can be obtained from request
        });

        toast.success("NIN Found", {
          description: "Phone number matched to a valid NIN.",
        });
      } else if (data.service_down) {
        toast.error("Service Unavailable", {
          description:
            data.message || "NIN lookup service is temporarily down.",
        });
      } else {
        toast.error("Verification Failed", {
          description: data.message || "No NIN found for this phone number.",
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
