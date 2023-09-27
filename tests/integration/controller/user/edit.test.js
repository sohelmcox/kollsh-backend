const request = require("supertest");
const { app } = require("../../../setup/app");
const userController = require("../../../../src/api/v1/user/controllers");
const userServices = require("../../../../src/lib/user");
const {
  userTestUrl,
  mockUpdatedUser,
  editUserData,
} = require("../../../testSeed/user");

// Mock service methods
jest.mock("../../../../src/lib/user", () => ({
  edit: jest.fn(),
}));

// Set up route
app.put(`${userTestUrl}/:id`, userController.edit);

describe("User Edit Controller", () => {
  it("should update an existing user", async () => {
    // Mock the edit method from your service to return an updated user
    userServices.edit.mockResolvedValue(mockUpdatedUser);

    const response = await request(app)
      .put(`${userTestUrl}/userId`)
      .send(editUserData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("User updated successfully");
    expect(response.body.data.id).toBe("userId");
    expect(response.body.data.name).toBe("Updated User");
    expect(response.body.data.username).toBe("Updated Username");
  });

  it("should handle errors from the service", async () => {
    // Mock the edit method to throw an error
    userServices.edit.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .put(`${userTestUrl}/userId`)
      .send(editUserData);

    expect(response.statusCode).toBe(500);
  });
});
