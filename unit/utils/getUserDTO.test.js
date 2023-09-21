const getUserDTO = require("../../../src/utils/getUserDTO");

describe("getUserDTO", () => {
  it("should map user properties to a DTO", () => {
    // Arrange: Create a sample user object
    const user = {
      name: "John Doe",
      username: "johndoe",
      email: "johndoe@example.com",
      role: "user",
      blocked: false,
      confirmed: true,
      password: "sdfa",
      confirmationCode: "asdf",
      role: "user",
      resetPasswordCode: "",
      resetPasswordRCodeExpires: "",
      passwordResetAttempts: 0,
      confirmationCodeExpires: Date.now() + 3600000, // 1 hour from now
      emailVerificationAttempts: 0,
    };

    // Act: Call the getUserDTO function
    const userDTO = getUserDTO(user);

    // Assert: Check if the userDTO object matches the expected structure
    expect(userDTO).toEqual({
      name: "John Doe",
      username: "johndoe",
      email: "johndoe@example.com",
      role: "user",
      blocked: false,
      confirmed: true,
    });
  });
});
