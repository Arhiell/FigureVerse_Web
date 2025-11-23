(function(){
  const AuthContext = React.createContext({ token: null, user: null });
  function AuthProvider(props){
    const [token, setToken] = React.useState(TokenStorage.isAuthenticated() ? TokenStorage.getToken() : null);
    const [user, setUser] = React.useState(TokenStorage.getUser());
    const [error, setError] = React.useState(null);
    const login = async (email, password) => {
      setError(null);
      const data = await API.adminLogin(email, password);
      const tok = data.token || data.accessToken || data.jwt || "";
      const expires = data.expiresIn || 3600;
      const u = data.user || data.admin || null;
      const role = (u && (u.rol || u.role)) || null;
      if (!role || (role !== "admin" && role !== "super_admin")) {
        throw new Error("Acceso reservado a administradores");
      }
      TokenStorage.setToken(tok, expires, u);
      setToken(tok);
      setUser(u);
    };
    const logout = () => {
      TokenStorage.clear();
      setToken(null);
      setUser(null);
    };
    const value = { token, user, login, logout, error, isAuthenticated: () => TokenStorage.isAuthenticated() };
    return React.createElement(AuthContext.Provider, { value }, props.children);
  }
  window.AuthContext = AuthContext;
  window.AuthProvider = AuthProvider;
})();