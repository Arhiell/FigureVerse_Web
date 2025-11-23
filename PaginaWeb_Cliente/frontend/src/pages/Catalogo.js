(function(){
  function Catalogo(){
    return React.createElement("div", { className: "container" },
      React.createElement("div", { className: "title" }, "Catálogo"),
      React.createElement("div", null, "Próximamente")
    );
  }
  window.Catalogo = Catalogo;
})();