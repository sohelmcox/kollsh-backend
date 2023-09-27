const fs = require("fs");
const path = require("path");
const { User } = require("../../models");
const { notFound, badRequest } = require("../../utils/error");
const sendEmail = require("../../utils/mail/sendEmail");
const config = require("../../config");
const { findUserByEmail } = require("./userService");

const sendEmailConfirmation = async (email) => {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      throw notFound("User not found.");
    }
    // Check if the user has reached the verification email limit
    if (user.emailVerificationAttempts >= 3) {
      throw badRequest(
        "Email verification limit exceeded. Try again after 24 hours",
      );
    }
    // Increment the verification attempts
    user.emailVerificationAttempts += 1;

    // Send email verification email
    const emailVerificationLink = `${config.appUrl}/api/v1/auth/email-confirmation?code=${user.resetCode}`;
    const emailVerificationSubject = "Email Verification";
    const templateFilePath = path.join(
      __dirname,
      "../../utils/emailTemplate",
      "verification-email.html",
    );

    const emailTemplate = fs.readFileSync(templateFilePath, "utf-8");
    const emailHtml = emailTemplate
      .replace("{{ username }}", user.username)
      .replace("{{ link }}", emailVerificationLink);
    const emailResult = sendEmail({
      to: email,
      subject: emailVerificationSubject,
      html: emailHtml,
    });

    user.confirmationCodeExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();
    return emailResult;
  } catch (error) {
    throw badRequest(error.message);
  }
};
const emailConfirmationAttempts = async (email) => {
  // Check if the user exists
  const user = await findUserByEmail(email);
  if (!user) {
    throw badRequest("User not found.");
  }
  return user.emailVerificationAttempts;
};
module.exports = { sendEmailConfirmation, emailConfirmationAttempts };
