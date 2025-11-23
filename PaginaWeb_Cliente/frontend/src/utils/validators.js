(function(){
  function isEmail(v){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");
  }
  function minLen(v, n){
    return String(v || "").length >= (n || 0);
  }
  function maxLen(v, n){
    return String(v || "").length <= (n || Infinity);
  }
  function equals(a, b){
    return String(a || "") === String(b || "");
  }
  function isUsername(v){
    return /^[A-Za-z0-9_]{3,}$/.test(v || "");
  }
  function isAlphaSpaces(v){
    return /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/.test(v || "");
  }
  function isAlnum(v){
    return /^[A-Za-z0-9]+$/.test(v || "");
  }
  function isDigits(v){
    return /^[0-9]+$/.test(v || "");
  }
  function isPhone(v){
    return /^[+0-9\-() ]{6,}$/.test(v || "");
  }
  function isPostalCode(v){
    return /^[A-Za-z0-9 ]{3,10}$/.test(v || "");
  }
  window.Validators = { isEmail, minLen, maxLen, equals, isUsername, isAlphaSpaces, isAlnum, isDigits, isPhone, isPostalCode };
})();