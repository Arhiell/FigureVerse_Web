// Formulario de registro con datos completos y redirección a inicio
(function(){
  function RegisterForm(){
    const auth = React.useContext(window.AuthContext);
    const [nombreUsuario, setNombreUsuario] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirm, setConfirm] = React.useState("");
    const [nombre, setNombre] = React.useState("");
    const [apellido, setApellido] = React.useState("");
    const [dni, setDni] = React.useState("");
    const [telefono, setTelefono] = React.useState("");
    const [direccion, setDireccion] = React.useState("");
    const [ciudad, setCiudad] = React.useState("");
    const [provincia, setProvincia] = React.useState("");
    const [pais, setPais] = React.useState("");
    const [codigoPostal, setCodigoPostal] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      if (!Validators.isUsername(nombreUsuario)) { setError("Nombre de usuario inválido"); return; }
      if (!Validators.isEmail(email)) { setError("Email inválido"); return; }
      if (!Validators.minLen(password, 8)) { setError("La contraseña debe tener al menos 8 caracteres"); return; }
      if (!Validators.equals(password, confirm)) { setError("Las contraseñas no coinciden"); return; }
      if (!Validators.isAlphaSpaces(nombre) || !Validators.minLen(nombre, 2)) { setError("Nombre inválido"); return; }
      if (!Validators.isAlphaSpaces(apellido) || !Validators.minLen(apellido, 2)) { setError("Apellido inválido"); return; }
      if (!Validators.isDigits(dni) || !Validators.minLen(dni, 6)) { setError("DNI inválido"); return; }
      if (!Validators.isPhone(telefono)) { setError("Teléfono inválido"); return; }
      if (!Validators.isAlphaSpaces(ciudad)) { setError("Ciudad inválida"); return; }
      if (!Validators.isAlphaSpaces(provincia)) { setError("Provincia inválida"); return; }
      if (!Validators.minLen(pais, 2)) { setError("Seleccione país"); return; }
      if (!Validators.isPostalCode(codigoPostal)) { setError("Código postal inválido"); return; }
      setLoading(true);
      try {
        const payload = {
          nombre_usuario: nombreUsuario,
          email,
          password,
          nombre,
          apellido,
          dni,
          telefono,
          direccion,
          ciudad,
          provincia,
          pais,
          codigo_postal: codigoPostal
        };
        await auth.register(payload);
        location.hash = "#/catalogo";
      } catch (err) {
        const msg = (err && err.message) || "Error de registro";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    return React.createElement("div", { className: "container" },
      React.createElement("div", { className: "title" }, "Registro de Cliente"),
      error ? React.createElement("div", { className: "error" }, error) : null,
      React.createElement("form", { onSubmit: handleSubmit },
        React.createElement("div", { className: "field" },
          React.createElement("label", null, "Nombre de usuario"),
          React.createElement("input", { type: "text", value: nombreUsuario, onChange: (e)=>setNombreUsuario(e.target.value.replace(/[^A-Za-z0-9_]/g,"")), placeholder: "Ej: arieldev" })
        ),
        React.createElement("div", { className: "field" },
          React.createElement("label", null, "Email"),
          React.createElement("input", { type: "email", value: email, onChange: (e)=>setEmail(e.target.value), placeholder: "tu@email.com" })
        ),
        React.createElement("div", { className: "field" },
          React.createElement("label", null, "Contraseña"),
          React.createElement("input", { type: "password", value: password, onChange: (e)=>setPassword(e.target.value), placeholder: "Mínimo 8 caracteres" })
        ),
        React.createElement("div", { className: "field" },
          React.createElement("label", null, "Confirmar contraseña"),
          React.createElement("input", { type: "password", value: confirm, onChange: (e)=>setConfirm(e.target.value), placeholder: "Repite la contraseña" })
        ),
        React.createElement("div", { className: "field" },
          React.createElement("label", null, "Nombre"),
          React.createElement("input", { type: "text", value: nombre, onChange: (e)=>setNombre(e.target.value.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]/g,"")), placeholder: "Tu nombre" })
        ),
        React.createElement("div", { className: "field" },
          React.createElement("label", null, "Apellido"),
          React.createElement("input", { type: "text", value: apellido, onChange: (e)=>setApellido(e.target.value.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]/g,"")), placeholder: "Tu apellido" })
        ),
        React.createElement("div", { className: "field" },
          React.createElement("label", null, "DNI"),
          React.createElement("input", { type: "text", value: dni, onChange: (e)=>setDni(e.target.value.replace(/[^0-9]/g,"")), placeholder: "Tu DNI" })
        ),
        React.createElement("div", { className: "field" },
          React.createElement("label", null, "Teléfono"),
          React.createElement("input", { type: "text", value: telefono, onChange: (e)=>setTelefono(e.target.value.replace(/[^+0-9\-() ]/g,"")), placeholder: "Tu teléfono" })
        ),
        React.createElement("div", { className: "field" },
          React.createElement("label", null, "Dirección"),
          React.createElement("input", { type: "text", value: direccion, onChange: (e)=>setDireccion(e.target.value), placeholder: "Dirección" })
        ),
        React.createElement("div", { className: "field" },
          React.createElement("label", null, "Ciudad"),
          React.createElement("input", { type: "text", value: ciudad, onChange: (e)=>setCiudad(e.target.value.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]/g,"")), placeholder: "Ciudad" })
        ),
        React.createElement("div", { className: "field" },
          React.createElement("label", null, "Provincia"),
          React.createElement("input", { type: "text", value: provincia, onChange: (e)=>setProvincia(e.target.value.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]/g,"")), placeholder: "Provincia" })
        ),
        React.createElement("div", { className: "field" },
          React.createElement("label", null, "País"),
          React.createElement("select", { value: pais, onChange: (e)=>setPais(e.target.value) },
            React.createElement("option", { value: "" }, "Selecciona país"),
            React.createElement("option", { value: "Argentina" }, "Argentina"),
            React.createElement("option", { value: "Brasil" }, "Brasil"),
            React.createElement("option", { value: "Paraguay" }, "Paraguay"),
            React.createElement("option", { value: "Uruguay" }, "Uruguay"),
            React.createElement("option", { value: "Chile" }, "Chile"),
            React.createElement("option", { value: "Bolivia" }, "Bolivia"),
            React.createElement("option", { value: "Perú" }, "Perú")
          )
        ),
        React.createElement("div", { className: "field" },
          React.createElement("label", null, "Código postal"),
          React.createElement("input", { type: "text", value: codigoPostal, onChange: (e)=>setCodigoPostal(e.target.value.replace(/[^A-Za-z0-9 ]/g,"")), placeholder: "CP" })
        ),
        React.createElement("button", { type: "submit", disabled: loading }, loading ? "Registrando..." : "Registrarme")
      )
    );
  }
  window.RegisterForm = RegisterForm;
})();