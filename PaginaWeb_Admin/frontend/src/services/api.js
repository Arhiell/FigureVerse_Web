(function(){
  const BASE = window.Config.API_BASE_URL;
  async function request(path, options){
    const headers = Object.assign({}, options?.headers || {});
    const t = (window.TokenStorage && window.TokenStorage.getToken && window.TokenStorage.getToken()) || null;
    if (t) headers["Authorization"] = "Bearer " + t;
    const res = await fetch(BASE + path, Object.assign({}, options, { headers }));
    let data = null;
    try { data = await res.json(); } catch(e) { data = null; }
    if (!res.ok) {
      const msg = (data && (data.error || data.message)) || "Error";
      const status = res.status;
      throw { message: msg, status, data };
    }
    return data;
  }
  function adminLogin(identifier, password){
    const body = { password };
    if (identifier && identifier.includes("@")) body.email = identifier; else body.nombre_usuario = identifier;
    return request("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
  }
  window.API = { adminLogin };
})();