const request = require("supertest");
const { app } = require("../../../setup/app");
const userController = require("../../../../src/api/v1/user/controllers");
const userServices = require("../../../../src/lib/user");
const { userTestUrl, mockUser } = require("../../../testSeed/user");

// Mock service methods
jest.mock("../../../../src/lib/user", () => ({
  findSingle: jest.fn(),
}));

// Set up route
app.get(`${userTestUrl}/:id`, userController.findSingle);

describe("User FindSingle Controller", () => {
  it("should find a single user by ID", async () => {
    // Mock the findSingle method from your service to return a user

    userServices.findSingle.mockResolvedValue(mockUser);

    const response = await request(app).get(`${userTestUrl}/userId`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe("userId");
    expect(response.body.data.name).toBe("Test User");
    expect(response.body.data.username).toBe("test username");
  });

  it("should handle errors from the service", async () => {
    // Mock the findSingle method to throw an error
    userServices.findSingle.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).get(`${userTestUrl}/userId`);

    expect(response.statusCode).toBe(500);
  });
});
