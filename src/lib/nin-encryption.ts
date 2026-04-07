import { ninService } from "@/services/nin.service";

export async function encryptNIN(nin: string): Promise<string> {
  // 1. Fetch public key
  const { public_key } = await ninService.getPublicKey();
  
  // 2. Convert PEM to CryptoKey
  const pemHeader = "-----BEGIN PUBLIC KEY-----";
  const pemFooter = "-----END PUBLIC KEY-----";
  const pemContents = public_key.replace(pemHeader, "").replace(pemFooter, "");
  const binaryDerString = atob(pemContents.trim());
  const binaryDer = Uint8Array.from(binaryDerString, (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "spki",
    binaryDer,
    { name: "RSA-OAEP", hash: "SHA-1" },
    true,
    ["encrypt"]
  );

  // 3. Encrypt NIN
  const encodedNin = new TextEncoder().encode(nin);
  const encrypted = await crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    cryptoKey,
    encodedNin
  );

  // 4. Return base64
  return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
}