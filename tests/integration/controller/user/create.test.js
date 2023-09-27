const request = require("supertest");
const { app } = require("../../../setup/app");
const userController = require("../../../../src/api/v1/user/controllers");
const userServices = require("../../../../src/lib/user");
const { userTestUrl, userTestData } = require("../../../testSeed/user");
// Mock service methods
jest.mock("../../../../src/lib/user", () => ({
  create: jest.fn(),
}));

// Set up route
app.post(userTestUrl, userController.create);

describe("User Controller", () => {
  it("should create a new user", async () => {
    // Mock the create method from your service to return a sample user

    userServices.create.mockResolvedValue(userTestData);

    const response = await request(app).post(userTestUrl).send(userTestData);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("User Created Successfully");
    expect(response.body.data).toEqual(userTestData);
  });
});
