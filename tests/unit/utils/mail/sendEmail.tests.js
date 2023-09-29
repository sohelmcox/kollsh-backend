const sendEmail = require("../../../../src/utils/mail/sendEmail"); // Import the sendEmail service
const FormData = require("form-data");
const Mailgun = require("mailgun.js");
const config = require("../../../../src/config");

// Mock the FormData constructor
jest.mock("form-data", () => {
  return {
    append: jest.fn(),
  };
});

// Mock the Mailgun constructor and methods
jest.mock("mailgun.js", () => {
  const createFn = jest.fn(() => Promise.resolve("Email sent successfully"));
  return {
    client: jest.fn(() => ({
      messages: {
        create: createFn,
      },
    })),
  };
});

// Mock the Mailgun constructor and methods
jest.mock("mailgun.js", () => {
  return {
    client: jest.fn(() => ({
      messages: {
        create: jest.fn(() => Promise.resolve("Email sent successfully")),
      },
    })),
  };
});

// Mock the config module
jest.mock("../../../../src/config", () => {
  return {
    mailgunApiKey: "your-api-key",
    mailDomain: "your-mail-domain",
    appName: "Your App",
    appEmailSender: "your-app-email@example.com",
  };
});

describe("sendEmail", () => {
  it("should send an email successfully", async () => {
    const emailInfo = {
      to: "recipient@example.com",
      subject: "Test Subject",
      html: "<h1>Test HTML</h1>",
    };

    const response = await sendEmail(emailInfo);
    expect(response).toBe("Email sent successfully");
  });

  //   it("should throw an error when sending email fails", async () => {
  //     // Simulate a failure by rejecting the promise
  //     Mailgun()
  //       .client()
  //       .messages.create.mockRejectedValue(new Error("Email sending failed"));

  //     const emailInfo = {
  //       to: "recipient@example.com",
  //       subject: "Test Subject",
  //       html: "<h1>Test HTML</h1>",
  //     };

  //     try {
  //       await sendEmail(emailInfo);
  //       // If the email sends successfully, fail the test
  //       throw new Error("Expected sendEmail to throw an error");
  //     } catch (error) {
  //       expect(error.message).toBe(
  //         "Error during send email: Email sending failed",
  //       );
  //     }
  //   });
});
