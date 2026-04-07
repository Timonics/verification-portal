import { cookies } from "next/headers";

export const TOKEN_COOKIE_NAME = "auth_token";
export const SESSION_TOKEN_COOKIE_NAME = "session_token";

export async function setAuthToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: TOKEN_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60, // 1 hour
    path: "/",
  });
}

export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_COOKIE_NAME)?.value;
}

export async function removeAuthToken() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE_NAME);
}

export async function setSessionToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 30, // 30 minutes
    path: "/",
  });
}

export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_TOKEN_COOKIE_NAME)?.value;
}

export async function removeSessionToken() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_TOKEN_COOKIE_NAME);
}
