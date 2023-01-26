const request = {
  get(url: string) {
    return fetch(url);
  },
  post(url: string, payload: {}) {
    return fetch(url, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },
  put(url: string, payload: {}) {
    return fetch(url, {
      method: "PUT",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },
  patch(url: string, payload: {}) {
    return fetch(url, {
      method: "PATCH",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },
  delete(url: string) {
    return fetch(url, { method: "DELETE" });
  },
};

export default request;
