const sendEmail = require("../../../../src/utils/mail/sendEmail");
const config = require("../../../../src/config");
// const Mailgun = require("mailgun.js");

// Mock the Mailgun instance
jest.mock("mailgun.js", () => {
  const client = {
    messages: jest.fn(),
  };
  client.messages.create = jest.fn();
  return { client };
});

describe("sendEmail Function", () => {
  it("should send an email with default parameters", async () => {
    // Arrange
    const to = "recipient@example.com";
    const expectedEmail = {
      from: `${config.appName} <${config.appEmailSender}>`,
      to: [to],
      subject: "Mail Testing",
      html: "<h1>Testing some Mailgun awesomeness!</h1>",
    };
    const mockMessage = { id: "12345" };
    Mailgun.client().messages.create.mockResolvedValue(mockMessage);

    // Act
    const result = await sendEmail({ to });

    // Assert
    expect(Mailgun.client).toHaveBeenCalledWith({
      username: "api",
      key: config.mailgunApiKey,
    });
    expect(Mailgun.client().messages.create).toHaveBeenCalledWith(
      config.mailDomain,
      expectedEmail,
    );
    expect(result).toEqual(mockMessage);
  });

  it("should send an email with custom subject and HTML body", async () => {
    // Arrange
    const to = "ibsifat900@gmail.com";
    const customSubject = "Custom Subject";
    const customHtmlBody = "<p>This is a custom HTML email</p>";
    const expectedEmail = {
      from: `${config.appName} <${config.appEmailSender}>`,
      to: [to],
      subject: customSubject,
      html: customHtmlBody,
    };
    const mockMessage = { id: "12345" };
    Mailgun.client().messages.create.mockResolvedValue(mockMessage);

    // Act
    const result = await sendEmail({
      to,
      subject: customSubject,
      html: customHtmlBody,
    });

    // Assert
    expect(Mailgun.client).toHaveBeenCalledWith({
      username: "api",
      key: config.mailgunApiKey,
    });
    expect(Mailgun.client().messages.create).toHaveBeenCalledWith(
      config.mailDomain,
      expectedEmail,
    );
    expect(result).toEqual(mockMessage);
  });

  it("should handle errors when sending email", async () => {
    // Arrange
    const to = "recipient@example.com";
    const expectedErrorMessage = "Email sending failed";
    Mailgun.client().messages.create.mockRejectedValue(
      new Error(expectedErrorMessage),
    );

    // Act and Assert
    await expect(sendEmail({ to })).rejects.toThrowError(
      `Error during send email: ${expectedErrorMessage}`,
    );
  });
});
