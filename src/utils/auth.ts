export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function isTokenValid(): boolean {
  const token = getToken();
  if (!token) return false;

  try {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    const exp = payload.exp * 1000; 
    return Date.now() < exp;
  } catch {
    return false;
  }
}


export function saveToken(token: string): void {
  localStorage.setItem("token", token);
}

export function removeToken(): void {
  localStorage.removeItem("token");
}
