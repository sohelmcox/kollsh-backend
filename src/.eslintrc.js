module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    // "no-console": "warn", // Avoid using console.log() statements
    "no-unused-vars": "warn", // Warn about unused variables
    "no-undef": "error", // Detect undeclared variables
    "no-dupe-keys": "error", // Disallow duplicate keys in objects
    "no-extra-semi": "error", // Disallow unnecessary semicolons
    "no-irregular-whitespace": "error", // Disallow irregular whitespace
    "no-trailing-spaces": "error", // Disallow trailing spaces
    "comma-dangle": ["error", "always-multiline"], // Require trailing commas in multiline object and array literals
    // quotes: ["error", "dubble"], // Prefer single quotes
    semi: ["error", "always"], // Require semicolons at the end of statements
  },
};
