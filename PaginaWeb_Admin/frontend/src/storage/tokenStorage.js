(function(){
  const KEY = "admin_auth_token";
  const EXP_KEY = "admin_auth_exp";
  const USER_KEY = "admin_auth_user";
  function setToken(token, expiresInSeconds, user){
    const exp = Date.now() + ((expiresInSeconds || 0) * 1000);
    localStorage.setItem(KEY, token || "");
    localStorage.setItem(EXP_KEY, String(exp));
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  function getToken(){
    return localStorage.getItem(KEY) || null;
  }
  function getUser(){
    const v = localStorage.getItem(USER_KEY);
    return v ? JSON.parse(v) : null;
  }
  function isExpired(){
    const exp = Number(localStorage.getItem(EXP_KEY) || 0);
    return !exp || Date.now() > exp;
  }
  function isAuthenticated(){
    const t = getToken();
    return !!t && !isExpired();
  }
  function clear(){
    localStorage.removeItem(KEY);
    localStorage.removeItem(EXP_KEY);
    localStorage.removeItem(USER_KEY);
  }
  window.TokenStorage = { setToken, getToken, getUser, isExpired, isAuthenticated, clear };
})();