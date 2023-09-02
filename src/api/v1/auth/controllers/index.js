const localLogin = require("./localLogin");
const localRegister = require("./localRegister");
const emailConfirmation = require("./emailConfirmation");
const sendEmailConfirmation = require("./sendEmailConfirmation");
const forgotPassword = require("./forgotPassword");
const resetPassword = require("./resetPassword");

module.exports = {
  localLogin,
  localRegister,
  emailConfirmation,
  sendEmailConfirmation,
  forgotPassword,
  resetPassword,
};
