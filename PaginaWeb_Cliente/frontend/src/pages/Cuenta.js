(function(){
  function Cuenta(){
    const auth = React.useContext(window.AuthContext);
    React.useEffect(()=>{
      if (!auth.isAuthenticated()) {
        location.hash = "#/login";
      }
    }, [auth.token]);
    const u = auth.user || {};
    return React.createElement("div", { className: "container" },
      React.createElement("div", { className: "title" }, "Mi Cuenta"),
      React.createElement("div", null, `Hola ${u.nombre || u.name || "Usuario"}`),
      React.createElement("div", { className: "row" },
        React.createElement("span", null, "Sesión activa"),
        React.createElement("button", { onClick: auth.logout }, "Cerrar sesión")
      )
    );
  }
  window.Cuenta = Cuenta;
})();