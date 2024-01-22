class LocalStorage {
  getAccessToken() {
    return localStorage.getItem("auth-token");
  }

  setAccessToken(token: string) {
    localStorage.setItem("auth-token", token);
  }

  clearAccessToken() {
    localStorage.setItem("auth-token", "");
  }

  clearCredential() {
    localStorage.removeItem("auth-token");
  }

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}

export const storage = new LocalStorage();
