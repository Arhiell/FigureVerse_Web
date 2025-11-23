(function(){
  function Root(){
    const [route, setRoute] = React.useState(location.hash || "#/login");
    React.useEffect(()=>{
      const onHash = ()=> setRoute(location.hash || "#/login");
      window.addEventListener("hashchange", onHash);
      return ()=> window.removeEventListener("hashchange", onHash);
    }, []);
    const auth = React.useContext(window.AuthContext);
    const path = route.replace("#", "");
    if (path === "/dashboard") {
      if (!auth.isAuthenticated()) return React.createElement(window.LoginForm);
      return React.createElement(window.Dashboard);
    }
    return React.createElement(window.LoginForm);
  }
  function App(){
    return React.createElement(window.AuthProvider, null, React.createElement(Root));
  }
  ReactDOM.render(React.createElement(App), document.getElementById("root"));
})();