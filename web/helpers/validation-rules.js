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
