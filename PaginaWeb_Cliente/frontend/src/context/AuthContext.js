(function(){
  const AuthContext = React.createContext({ token: null, user: null });
  function AuthProvider(props){
    const [token, setToken] = React.useState(TokenStorage.isAuthenticated() ? TokenStorage.getToken() : null);
    const [user, setUser] = React.useState(TokenStorage.getUser());
    const [error, setError] = React.useState(null);
    const login = async (email, password) => {
      setError(null);
      const data = await API.clientLogin(email, password);
      const tok = data.token || data.accessToken || data.jwt || "";
      const expires = data.expiresIn || 3600;
      const u = data.user || data.cliente || null;
      TokenStorage.setToken(tok, expires, u);
      setToken(tok);
      setUser(u);
    };
    const register = async (payload) => {
      setError(null);
      const data = await API.clientRegister(payload);
      const tok = data.token || data.accessToken || data.jwt || "";
      const expires = data.expiresIn || 3600;
      const u = data.user || data.cliente || null;
      if (tok) {
        TokenStorage.setToken(tok, expires, u);
        setToken(tok);
        setUser(u);
      }
      return data;
    };
    const logout = () => {
      TokenStorage.clear();
      setToken(null);
      setUser(null);
    };
    const value = { token, user, login, register, logout, error, isAuthenticated: () => TokenStorage.isAuthenticated() };
    return React.createElement(AuthContext.Provider, { value }, props.children);
  }
  window.AuthContext = AuthContext;
  window.AuthProvider = AuthProvider;
})();