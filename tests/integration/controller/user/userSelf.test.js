const request = require("supertest");
const { app } = require("../../../setup/app");
const userController = require("../../../../src/api/v1/user/controllers");
const userServices = require("../../../../src/lib/user");
const { userTestUrl, mockUser } = require("../../../testSeed/user");

// Mock service methods
jest.mock("../../../../src/lib/user", () => ({
  userSelf: jest.fn(),
}));
function setTestUser(req, res, next) {
  req.user = {
    id: "6502a59b35d01ff95a2c2527",
    name: "Ibrahim Sifat",
    username: "username",
    email: "ibsifat900@gmail.com",
    confirmed: true,
    blocked: false,
  };
  next();
}

// Set up route
app.get(`${userTestUrl}/me`, setTestUser, userController.userSelf);

describe("User FindSingle Controller", () => {
  it("should find an authenticated user", async () => {
    // Mock the userSelf method from your service to return a user
    userServices.userSelf.mockResolvedValue(mockUser);

    const response = await request(app).get(`${userTestUrl}/me`);
    console.log(response);
    expect(response.statusCode).toBe(200);

    // Add expectations for the response body based on your mockUser data
    expect(response.body.id).toBe(mockUser.id);
    expect(response.body.data.name).toBe(mockUser.name);
    expect(response.body.data.username).toBe(mockUser.username);
  });

  it("should handle errors from the service", async () => {
    // Mock the userSelf method to throw an error
    userServices.userSelf.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).get(`${userTestUrl}/me`);

    expect(response.statusCode).toBe(500);
  });
});
