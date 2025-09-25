export type JwtPayload = {
  exp?: number;
  iat?: number;
  [k: string]: any;
};

export function decodeJwt<T = JwtPayload>(token: string): T | null {
  try {
    const base64 = token.split(".")[1];
    const payload = JSON.parse(atob(base64));
    return payload as T;
  } catch (err) {
    return null;
  }
}

export function getTokenRemainingSeconds(token: string): number {
  const payload = decodeJwt(token);
  if (!payload?.exp) return 0;
  const now = Math.floor(Date.now() / 1000);
  return payload.exp - now;
}

export function isJwtExpired(token: string, skewSeconds = 30): boolean {
  const remaining = getTokenRemainingSeconds(token);
  return remaining <= skewSeconds;
}
