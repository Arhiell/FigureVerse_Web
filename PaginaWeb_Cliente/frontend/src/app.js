(function(){
  function Root(){
    const [route, setRoute] = React.useState(location.hash || "#/login");
    React.useEffect(()=>{
      const onHash = ()=> setRoute(location.hash || "#/login");
      window.addEventListener("hashchange", onHash);
      return ()=> window.removeEventListener("hashchange", onHash);
    }, []);
    const path = route.replace("#", "");
    if (path === "/registro") return React.createElement(window.RegisterForm);
    if (path === "/cuenta") return React.createElement(window.Cuenta);
    if (path === "/catalogo") return React.createElement(window.Catalogo);
    return React.createElement(window.LoginForm);
  }
  function App(){
    return React.createElement(window.AuthProvider, null, React.createElement(Root));
  }
  ReactDOM.render(React.createElement(App), document.getElementById("root"));
})();