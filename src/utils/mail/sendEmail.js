const formData = require("form-data");
const Mailgun = require("mailgun.js");
const config = require("../../config");

const mailgun = new Mailgun(formData);

const sendEmail = async ({
  to,
  subject = "Welcome to Kollsh",
  // body = "Mail Testing is awesomeness!",
  html = "<h1>Kollsh is awesomeness!</h1>",
}) => {
  try {
    const mg = mailgun.client({
      username: "api",
      key: config.mailgunApiKey,
    });

    const msg = await mg.messages.create(config.mailDomain, {
      from: `${config.appName} <${config.appEmailSender}>`,
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
