const request = {
  async get(url: string) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res;
  },
  async post(url: string, payload: unknown) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res;
  },
  async put(url: string, payload: unknown) {
    const res = await fetch(url, {
      method: "PUT",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res;
  },
  async patch(url: string, payload: unknown) {
    const res = await fetch(url, {
      method: "PATCH",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res;
  },
  async delete(url: string) {
    const res = await fetch(url, { method: "DELETE" });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res;
  },
};

export default request;
