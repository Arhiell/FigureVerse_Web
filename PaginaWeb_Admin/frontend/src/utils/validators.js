(function(){
  function isEmail(v){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");
  }
  function minLen(v, n){
    return String(v || "").length >= (n || 0);
  }
  window.Validators = { isEmail, minLen };
})();