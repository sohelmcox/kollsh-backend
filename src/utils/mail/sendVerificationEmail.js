const fs = require("fs");
const path = require("path");
const sendEmail = require("./sendEmail");
const config = require("../../config");

const sendVerificationEmail = async (user) => {
  const emailVerificationLink = `${config.appUrl}/api/v1/auth/email-confirmation?code=${user.confirmationCode}`;
  const emailVerificationSubject = "Email Verification";
  const templateFilePath = path.join(
    __dirname,
    "../emailTemplate",
    "verification-email.html",
  );

  const emailTemplate = fs.readFileSync(templateFilePath, "utf-8");
  const emailHtml = emailTemplate
    .replace("{{ username }}", user.username)
    .replace("{{ link }}", emailVerificationLink);
  const emailResult = sendEmail({
    to: user.email,
    subject: emailVerificationSubject,
    html: emailHtml,
  });
  return emailResult;
};
module.exports = sendVerificationEmail;
