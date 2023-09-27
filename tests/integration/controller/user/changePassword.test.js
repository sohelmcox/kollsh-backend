const request = require("supertest");
const { app } = require("../../../setup/app");
const userController = require("../../../../src/api/v1/user/controllers");
const userServices = require("../../../../src/lib/user");
const { userTestUrl } = require("../../../testSeed/user");
// Mock service methods
jest.mock("../../../../src/lib/user", () => ({
  changePassword: jest.fn(),
}));

// Set up route
app.post(`${userTestUrl}/change-password`, userController.changePassword);

describe("User Controller", () => {
  it("should changePassword of user", async () => {
    // Mock the changePassword method from your service to return a sample user
    const userTestData = {
      id: "userId",
      password: "newPassword",
      passwordConfirmation: "newPassword",
    };
    userServices.changePassword.mockResolvedValue({
      code: 200,
      message: "Password changed successfully",
    });

    const response = await request(app)
      .post(`${userTestUrl}/change-password`)
      .send(userTestData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("Password changed successfully");
  });
});
