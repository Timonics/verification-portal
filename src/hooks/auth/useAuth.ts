import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "./api";
import { authKeys } from "./keys";
import { toast } from "sonner";
import { useAddActivityLog } from "../useActivityLogs";

export function useUser() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: authApi.getMe,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      console.log(data);

      if (data.success) {
        // Check if 2FA is required
        if (data.requires_2fa && data.session_token) {
          // Store 2FA info in session storage
          sessionStorage.setItem("2fa_email", data.user.email);
          sessionStorage.setItem("2fa_session_token", data.session_token);
          sessionStorage.setItem("2fa_role", "super-admin");

          toast.info("Verification required", {
            description: "Please enter the code sent to your email",
          });

          console.log("Redirecting to 2FA verification page");

          // Try router.push first
          try {
            router.push("/verify-otp");
          } catch (e) {
            console.log("router.push failed, using window.location", e);
            window.location.href = "/verify-otp";
          }

          // IMPORTANT: Return here to prevent further execution
          return;
        }
      } else {
        toast.error("Login failed", {
          description: data.message || "Invalid credentials",
        });
      }
    },
  });
}

export function useVerify2FA() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: addLog } = useAddActivityLog();

  return useMutation({
    mutationFn: authApi.verify2FA,
    onSuccess: (data) => {
      if (data.success && data?.user) {
        // Update cache with user data
        queryClient.setQueryData(authKeys.user(), data.user);

        localStorage.setItem("user-data", data.user);
        localStorage.setItem("user-role", data.user.roles[0]);

        toast.success("Successfully verified", {
          description: "Redirecting to your Dashboard...",
        });

        addLog({
          action: "LOGIN",
          status: "SUCCESS",
          userEmail: "admin@josbiz.com",
          // ipAddress can be obtained from request
        });

        router.push("/dashboard");
      } else {
        toast.error("Verification failed", {
          description: data.message || "Invalid verification code",
        });
      }
    },
  });
}

export function useResend2FA() {
  return useMutation({
    mutationFn: authApi.resend2FA,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Verification code resent", {
          description: data.message || "Please check your email",
        });
      } else {
        toast.error("Failed to resend code", {
          description: data.message || "Please try again later",
        });
      }
    },
    onError: (error: any) => {
      toast.error("Error resending code", {
        description: error.message || "Network error",
      });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.clear(); // Clear all cached queries
      router.push("/login");
    },
  });
}
