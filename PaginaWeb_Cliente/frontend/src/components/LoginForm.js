(function(){
  function LoginForm(){
    const auth = React.useContext(window.AuthContext);
    const [identifier, setIdentifier] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      const id = String(identifier || "");
      const isMail = id.includes("@");
      if (isMail) {
        if (!Validators.isEmail(id)) {
          setError("Email inválido");
          return;
        }
      } else {
        if (!Validators.minLen(id, 3)) {
          setError("Usuario inválido");
          return;
        }
      }
      if (!Validators.minLen(password, 6)) {
        setError("La contraseña debe tener al menos 6 caracteres");
        return;
      }
      setLoading(true);
      try {
        await auth.login(id, password);
        location.hash = "#/cuenta";
      } catch (err) {
        const msg = (err && err.message) || "Error de autenticación";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    return React.createElement("div", { className: "container" },
      React.createElement("div", { className: "title" }, "Login Cliente"),
      error ? React.createElement("div", { className: "error" }, error) : null,
      React.createElement("form", { onSubmit: handleSubmit },
        React.createElement("div", { className: "field" },
          React.createElement("label", null, "Email o usuario"),
          React.createElement("input", { type: "text", autoComplete: "username", value: identifier, onChange: (e)=>setIdentifier(e.target.value), placeholder: "tu@email.com o arieldev" })
        ),
        React.createElement("div", { className: "field" },
          React.createElement("label", null, "Contraseña"),
          React.createElement("input", { type: "password", autoComplete: "current-password", value: password, onChange: (e)=>setPassword(e.target.value), placeholder: "Tu contraseña" })
        ),
        React.createElement("button", { type: "submit", disabled: loading }, loading ? "Ingresando..." : "Ingresar")
      ),
      React.createElement("div", { className: "row" },
        React.createElement("span", null, "¿No tienes cuenta?"),
        React.createElement("span", { className: "link", onClick: ()=> location.hash = "#/registro" }, "Crear cuenta")
      )
    );
  }
  window.LoginForm = LoginForm;
})();