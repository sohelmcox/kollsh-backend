const request = require("supertest");
const { app } = require("../../../setup/app");
const commentController = require("../../../../src/api/v1/comment/controllers");
const commentServices = require("../../../../src/lib/comment");
const {
  commentTestUrl,
  commentTestData,
} = require("../../../testSeed/comment");
// Mock service methods
jest.mock("../../../../src/lib/comment", () => ({
  create: jest.fn(),
}));
// TODO: fix this create comment test
// Set up Express app and route
app.post(commentTestUrl, commentController.create);

describe("Comment Controller", () => {
  it("should create a new comment", async () => {
    // Mock the create method from service to return a sample comment

    commentServices.create.mockResolvedValue(commentTestData);

    const response = await request(app)
      .post(commentTestUrl)
      .send(commentTestData);
    console.log(response.body);
    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("Comment Created Successfully");
    expect(response.body.data).toEqual(commentTestData);
  });
});
