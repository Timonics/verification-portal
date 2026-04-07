import axios from "axios";

export const authApi = {
  getMe: async () => {
    const { data } = await axios.get("/api/auth/me");
    if (!data.success) throw new Error(data.message);
    return data.data.user;
  },

  login: async ({ email, password }: { email: string; password: string }) => {
    const { data } = await axios.post("/api/auth/login", { email, password });
    if (!data.success) throw new Error(data.message);
    return data;
  },

  verify2FA: async ({ email, code }: { email: string; code: string }) => {
    const { data } = await axios.post("/api/auth/verify-2fa", { email, code });
    if (!data.success) throw new Error(data.message);
    return data;
  },

  resend2FA: async ({ email }: { email: string }) => {
    const { data } = await axios.post("/api/auth/resend-2fa", { email });
    if (!data.success) throw new Error(data.message);
    return data;
  },

  logout: async () => {
    const { data } = await axios.post("/api/auth/logout");
    return data;
  },
};
