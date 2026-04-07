import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { encryptNIN } from "@/lib/nin-encryption";
import { ninService } from "@/services/nin.service";
import type { NinVerificationResponse } from "@/types/nin.types";
import { useAddActivityLog } from "./useActivityLogs";

export function useNinVerification() {
  const { mutate: addLog } = useAddActivityLog();
  return useMutation<NinVerificationResponse, Error, string>({
    mutationFn: async (nin: string) => {
      const encryptedNin = await encryptNIN(nin);
      return ninService.verifyNIN(encryptedNin);
    },
    onSuccess: (data) => {
      if (data.success) {

        addLog({
          action: "NIN_VERIFICATION",
          status: "SUCCESS",
          userEmail: "admin@josbiz.com",
          // ipAddress can be obtained from request
        });

        toast.success("Verification Successful", {
          description: "NIN has been verified successfully.",
          duration: 4000,
        });
      } else if (data.service_down) {
        toast.error("Service Unavailable", {
          description: data.message || "NIN verification service is temporarily down. Please try again later.",
          duration: 5000,
        });
      } else {
        toast.error("Verification Failed", {
          description: data.message || "Invalid NIN or verification failed.",
          duration: 4000,
        });
      }
    },
    onError: (error) => {
      toast.error("Request Failed", {
        description: error.message || "An unexpected error occurred. Please try again.",
        duration: 5000,
      });
    },
  });
}