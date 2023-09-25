const request = require("supertest");
const { app } = require("../../../setup/app");
const replyController = require("../../../../src/api/v1/reply/controllers");
const replyServices = require("../../../../src/lib/reply");
const { replyTestUrl, replyTestData } = require("../../../testSeed/reply");

// Mock service methods
jest.mock("../../../../src/lib/reply", () => ({
  create: jest.fn(),
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
app.post(replyTestUrl, setTestUser, replyController.create);

describe("Reply Controller", () => {
  it("should create a new reply", async () => {
    // Mock the create method from your service to return a sample reply

    replyServices.create.mockResolvedValue(replyTestData);

    const response = await request(app).post(replyTestUrl).send(replyTestData);
    // console.log(response);
    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("Reply Created Successfully");
    expect(response.body.data).toEqual(replyTestData);
  });
});
