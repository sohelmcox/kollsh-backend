const fs = require("fs");
const path = require("path");
const generateUniqueCode = require("../../utils/generateUniqueCode");
const { badRequest } = require("../../utils/error");
const sendEmail = require("../../utils/mail/sendEmail");
const { findUserByEmail } = require("./userService");
const config = require("../../config");

// forgot password
const forgotPassword = async (email) => {
  // Find the user by email
  const user = await findUserByEmail(email);

  if (!user) {
    throw badRequest("User not found.");
  }
  // Check if the user has reached the reset password  limit
  if (user.passwordResetAttempts >= config.passwordResetLimit) {
    throw badRequest("Reset Password limit exceeded. Try again after 24 hours");
  }
  // Generate a reset password code and set expiration time
  const resetPasswordCode = generateUniqueCode();
  const expirationTime = new Date();
  expirationTime.setHours(expirationTime.getHours() + 1); // Set expiration to 1 hour from now

  user.resetPasswordCode = resetPasswordCode;
  user.resetPasswordRCodeExpires = expirationTime;
  user.passwordResetAttempts += 1;

  // Send an email to the user with the reset code
  const templateFilePath = path.join(
    __dirname,
    "../../utils/emailTemplate",
    "reset-password.html",
  );

  const emailTemplate = fs.readFileSync(templateFilePath, "utf-8");
  const emailHtml = emailTemplate
    .replace("{{ username }}", user.username)
    .replace("{{ otp }}", resetPasswordCode);
  const emailVerificationSubject = "Reset Password OTP Verification";
  const emailResult = sendEmail({
    to: email,
    subject: emailVerificationSubject,
    html: emailHtml,
  });
  // console.log(emailHtml);
  user.confirmationCodeExpires = Date.now() + 3600000; // 1 hour from now
  await user.save();
  return emailResult;
};
module.exports = forgotPassword;
