const formData = require("form-data");
const Mailgun = require("mailgun.js");

const mailgun = new Mailgun(formData);

const sendEmail = async ({
  to,
  subject = "Mail Testing",
  // body = "Mail Testing is awesomeness!",
  html = "<h1>Testing some Mailgun awesomeness!</h1>",
}) => {
  try {
    const mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY,
    });

    const msg = await mg.messages.create(process.env.MAIL_DOMAIN, {
      from: `${process.env.APP_NAME} <${process.env.APP_EMAIL_SENDER}>`,
      to: [to],
      subject,
      // text: body,
      html,
    });
    return msg; // logs response data
  } catch (err) {
    throw new Error(`Error during send email: ${err.message}`);
  }
};

module.exports = sendEmail;
