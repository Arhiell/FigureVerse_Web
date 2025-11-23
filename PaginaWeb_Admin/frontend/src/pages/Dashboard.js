(function(){
  function Dashboard(){
    const auth = React.useContext(window.AuthContext);
    React.useEffect(()=>{
      if (!auth.isAuthenticated()) {
        location.hash = "#/login";
      }
    }, [auth.token]);
    return React.createElement("div", { className: "container" },
      React.createElement("div", { className: "title" }, "Panel Administrativo"),
      React.createElement("div", null, auth.user ? `Bienvenido ${auth.user.nombre || auth.user.name || "Administrador"}` : ""),
      React.createElement("div", { className: "row" },
        React.createElement("div", null, "Sesión activa"),
        React.createElement("button", { onClick: auth.logout }, "Cerrar sesión")
      )
    );
  }
  window.Dashboard = Dashboard;
})();