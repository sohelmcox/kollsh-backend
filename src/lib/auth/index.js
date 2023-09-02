const localLogin = require("./localLogin");
const localRegister = require("./localRegister");
const emailConformation = require("./emailConformation");
const sendEmailConfirmation = require("./sendEmailConfirmation");
const forgotPassword = require("./forgotPassword");
const resetPassword = require("./resetPassword");

module.exports = {
  localLogin,
  localRegister,
  emailConformation,
  sendEmailConfirmation,
  forgotPassword,
  resetPassword,
};
