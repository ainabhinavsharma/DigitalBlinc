export const validate = {
  email: (val) => /^\S+@\S+\.\S+$/.test(val),
  aadhaar: (val) => /^\d{12}$/.test(val),
  pan: (val) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val.toUpperCase()),
  ifsc: (val) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(val.toUpperCase()),
  account: (val) => /^\d{9,18}$/.test(val)
};