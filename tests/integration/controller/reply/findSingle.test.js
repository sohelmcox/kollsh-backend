const request = require("supertest");
const { app } = require("../../../setup/app");
const replyController = require("../../../../src/api/v1/reply/controllers");
const replyServices = require("../../../../src/lib/reply");
const { replyTestUrl, mockReply } = require("../../../testSeed/reply");

// Mock service methods
jest.mock("../../../../src/lib/reply", () => ({
  findSingle: jest.fn(),
}));

// Set up route
app.get(`${replyTestUrl}/:id`, replyController.findSingle);

describe("Reply FindSingle Controller", () => {
  it("should find a single reply by ID", async () => {
    // Mock the findSingle method from your service to return a reply

    replyServices.findSingle.mockResolvedValue(mockReply);

    const response = await request(app).get(`${replyTestUrl}/replyId`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe("replyId");
    expect(response.body.data.content).toBe("Test Reply");
  });

  it("should handle errors from the service", async () => {
    // Mock the findSingle method to throw an error
    replyServices.findSingle.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).get(`${replyTestUrl}/replyId`);

    expect(response.statusCode).toBe(500);
  });
});
