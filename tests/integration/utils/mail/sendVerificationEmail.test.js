const fs = require("fs");
const path = require("path");
const sendVerificationEmail = require("../../../../src/utils/mail/sendVerificationEmail");
const sendEmail = require("../../../../src/utils/mail/sendEmail");
const config = require("../../../../src/config");

jest.mock("../../../../src/utils/mail/sendEmail");

describe("sendVerificationEmail", () => {
  it("should send a verification email", async () => {
    // Mock user data
    const user = {
      email: "ibsifat900@gamil.com",
      username: "testuser",
      confirmationCode: "123456",
    };

    // Mock the email template
    const templatePath = path.join(
      __dirname,
      "../../../../src/utils/emailTemplate",
      "verification-email.html",
    );
    const templateContent = "<h1>Verification Email Template</h1>";
    jest.spyOn(fs, "readFileSync").mockReturnValue(templateContent);

    // Call the sendVerificationEmail function
    await sendVerificationEmail(user);

    // Check that sendEmail was called with the correct arguments
    expect(sendEmail).toHaveBeenCalledWith({
      to: user.email,
      subject: "Email Verification",
      html: expect.stringContaining("Verification Email Template"),
    });
  });
});
