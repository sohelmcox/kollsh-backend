const request = require("supertest");
const { app } = require("../../../setup/app");
const replyController = require("../../../../src/api/v1/reply/controllers");
const replyServices = require("../../../../src/lib/reply");
const { replyTestUrl } = require("../../../testSeed/reply");

// Mock service methods
jest.mock("../../../../src/lib/reply", () => ({
  destroy: jest.fn(),
}));

// Set up route
app.delete(`${replyTestUrl}/:id`, replyController.destroy);

describe("Reply Destroy Controller", () => {
  it("should delete an existing reply", async () => {
    // Mock the destroy method from your service to indicate success
    replyServices.destroy.mockResolvedValue();

    const response = await request(app).delete(`${replyTestUrl}/:replyId`);

    expect(response.statusCode).toBe(202);
    expect(response.text).toBe("ok");
  });

  it("should handle errors from the service", async () => {
    // Mock the destroy method to throw an error
    replyServices.destroy.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).delete(`${replyTestUrl}/:replyId`);

    expect(response.statusCode).toBe(500);
  });
});
