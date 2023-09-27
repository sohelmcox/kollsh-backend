const request = require("supertest");
const { app } = require("../../../setup/app");
const userController = require("../../../../src/api/v1/user/controllers");
const userServices = require("../../../../src/lib/user");
const {
  userTestUrl,
  createUserData,
  userTestQuery,
} = require("../../../testSeed/user");

// Mock the required dependencies
jest.mock("../../../../src/lib/user", () => ({
  findAll: jest.fn(),
}));

// Set up route
app.get(userTestUrl, userController.find);

describe("User Find Controller", () => {
  it("should find users with query parameters", async () => {
    // Mock the findAll method from your service to return a sample list of users

    userServices.findAll.mockResolvedValue(createUserData);

    const response = await request(app).get(userTestUrl).query(userTestQuery);

    expect(response.statusCode).toBe(200);
  });
});
