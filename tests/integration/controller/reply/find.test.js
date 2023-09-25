const request = require("supertest");
const { app } = require("../../../setup/app");
const replyController = require("../../../../src/api/v1/reply/controllers");
const replyServices = require("../../../../src/lib/reply");
const {
  replyTestUrl,
  createReplyData,
  replyTestQuery,
} = require("../../../testSeed/reply");

// Mock the required dependencies
jest.mock("../../../../src/lib/reply", () => ({
  findAll: jest.fn(),
}));

// Set up route
app.get(replyTestUrl, replyController.find);

describe("Reply Find Controller", () => {
  it("should find replies with query parameters", async () => {
    // Mock the findAll method from your service to return a sample list of replies

    replyServices.findAll.mockResolvedValue(createReplyData);

    const response = await request(app).get(replyTestUrl).query(replyTestQuery);

    expect(response.statusCode).toBe(200);
  });
});
