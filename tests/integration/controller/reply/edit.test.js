const request = require("supertest");
const { app } = require("../../../setup/app");
const replyController = require("../../../../src/api/v1/reply/controllers");
const replyServices = require("../../../../src/lib/reply");
const {
  replyTestUrl,
  mockUpdatedReply,
  editReplyData,
} = require("../../../testSeed/reply");

// Mock service methods
jest.mock("../../../../src/lib/reply", () => ({
  edit: jest.fn(),
}));

// Set up route
app.put(`${replyTestUrl}/:id`, replyController.edit);

describe("Reply Edit Controller", () => {
  it("should update an existing reply", async () => {
    // Mock the edit method from your service to return an updated reply
    replyServices.edit.mockResolvedValue(mockUpdatedReply);

    const response = await request(app)
      .put(`${replyTestUrl}/replyId`)
      .send(editReplyData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("Reply updated successfully");
    expect(response.body.data.id).toBe("replyId");
    expect(response.body.data.content).toBe("Updated Reply");
  });

  it("should handle errors from the service", async () => {
    // Mock the edit method to throw an error
    replyServices.edit.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .put(`${replyTestUrl}/replyId`)
      .send(editReplyData);

    expect(response.statusCode).toBe(500);
  });
});
