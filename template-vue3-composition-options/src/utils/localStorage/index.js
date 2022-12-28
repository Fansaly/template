const storage = {
  setItem: (key, payload) => {
    localStorage.setItem(key, btoa(encodeURIComponent(payload)));
  },
  getItem: (key) => {
    return decodeURIComponent(atob(localStorage.getItem(key)));
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  },
};

export { storage as localStorage };
