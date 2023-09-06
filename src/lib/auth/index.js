const localLogin = require("./localLogin");
const localRegister = require("./localRegister");
const emailConformation = require("./emailConformation");
const {
  sendEmailConfirmation,
  emailConfirmationAttempts,
} = require("./sendEmailConfirmation");
const forgotPassword = require("./forgotPassword");
const { resetPassword, resetPasswordAttempts } = require("./resetPassword");

module.exports = {
  localLogin,
  localRegister,
  emailConformation,
  sendEmailConfirmation,
  forgotPassword,
  resetPassword,
  resetPasswordAttempts,
  emailConfirmationAttempts,
};
