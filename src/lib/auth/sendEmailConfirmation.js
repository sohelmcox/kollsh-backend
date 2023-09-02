const fs = require("fs");
const path = require("path");
const { User } = require("../../models");
const { notFound, badRequest, serverError } = require("../../utils/error");
const sendEmail = require("../../utils/mail/sendEmail");

const sendEmailConfirmation = async (email) => {
  try {
    const user = await User.findOne({ email });

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
    const emailVerificationLink = `${process.env.APP_URL}/api/v1/auth/email-confirmation?code=${user.resetCode}`;
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
    throw serverError(`Error during send email confirmation: ${error.message}`);
  }
};
module.exports = sendEmailConfirmation;
