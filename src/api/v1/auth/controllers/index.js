const localLogin = require("./localLogin");
const localRegister = require("./localRegister");
const emailConfirmation = require("./emailConfirmation");
const sendEmailConfirmation = require("./sendEmailConfirmation");
const emailConfirmationAttempts = require("./emailConfirmationAttempts");
const forgotPassword = require("./forgotPassword");
const resetPassword = require("./resetPassword");
const resetPasswordAttempts = require("./resetPasswordAttempts");

module.exports = {
  localLogin,
  localRegister,
  emailConfirmation,
  sendEmailConfirmation,
  forgotPassword,
  resetPassword,
  resetPasswordAttempts,
  emailConfirmationAttempts,
};
