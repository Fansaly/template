const storage = {
  setItem: (key: string, payload: number | string) => {
    localStorage.setItem(key, btoa(encodeURIComponent(payload)));
  },
  getItem: (key: string) => {
    return decodeURIComponent(atob(localStorage.getItem(key) as string));
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  },
};

export { storage as localStorage };
