export function validatePassword(password) {
  const rules = {
    length: password.length >= 8,
    // uppercase: /[A-Z]/.test(password),
    // number: /[0-9]/.test(password),
    // symbol: /[^A-Za-z0-9]/.test(password),
  };

  const errors = [];

  if (!rules.length) errors.push("Almeno 8 caratteri");
  // if (!rules.uppercase) errors.push("Almeno una lettera maiuscola");
  // if (!rules.number) errors.push("Almeno un numero");
  // if (!rules.symbol) errors.push("Almeno un simbolo speciale (es. !, @, #)");

  const isValid = errors.length === 0;
 
  return {
    rules,
    errors,
    isValid
  };
}

