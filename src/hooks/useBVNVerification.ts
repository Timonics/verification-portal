import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { encryptNIN } from "@/lib/nin-encryption";
import { bvnService } from "@/services/bvn.service";
import type { BvnVerificationResponse } from "@/types/bvn.types";
import { useAddActivityLog } from "./useActivityLogs";

export function useBvnVerification() {
  const { mutate: addLog } = useAddActivityLog();
  return useMutation<BvnVerificationResponse, Error, string>({
    mutationFn: async (bvn: string) => {
      const encrypted_bvn = await encryptNIN(bvn);
      return bvnService.verifyBVN({ encrypted_bvn });
    },
    onSuccess: (data) => {
      if (data.success) {
        addLog({
          action: "BVN_VERIFICATION",
          status: "SUCCESS",
          userEmail: "admin@josbiz.com",
          // ipAddress can be obtained from request
        });

        toast.success("BVN Verified", {
          description: "BVN has been verified successfully.",
        });
      } else if (data.service_down) {
        toast.error("Service Unavailable", {
          description: data.message || "BVN service is temporarily down.",
        });
      } else {
        toast.error("Verification Failed", {
          description: data.message || "Invalid BVN or verification failed.",
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
