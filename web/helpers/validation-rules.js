/* Validation Rules For Login Form */
export function LoginRules() {
  return {
    emailRules: emailRules,
    passwordRules: passwordRules
  };
}

/* Validation Rules For Registeration Form */
export function RegisterationRules() {
  return {
    emailRules: emailRules,
    passwordRules: passwordRules
  };
}

/* Validation Rules For Setting Form */
export function SettingRules() {
  return {
    githubUrlRules: githubUrlRules,
    githubAuthorizeTokenRules: githubAuthorizeTokenRules
  };
}
/* Validation Rules For Payment Form */
export function PaymentRules() {
  return {
    cardNoRules: cardNoRules,
    expireMonthRules: expireMonthRules,
    expireYearRules: expireYearRules,
    cvvcodeRules: cvvcodeRules,
  };
}

let emailRules = [v => !!v || "Email is required",
 v => {
  const pattern = /^[\w-_\.+]*[\w-_\.]\@([\w]+\.)+[\w]+[\w]$/;
  return pattern.test(v) || 'Should be email format'
 }
];

let passwordRules = [
  v => !!v || "Password is required",
  v =>
    (v && v.length > 6) || "Password length must be greater than 6 characters"
];

let githubUrlRules = [
  v => !!v || "GitHub Path is required"
]

let githubAuthorizeTokenRules = [
  v => !!v || "GitHub authorize token is required"
]

let cardNoRules = [
  v => !!v || "Card No is Required"
]
let expireMonthRules = [
  v => !!v || "Required"
]
let expireYearRules = [
  v => !!v || "Required"
]
let cvvcodeRules = [
  v => !!v || "Required"
]
