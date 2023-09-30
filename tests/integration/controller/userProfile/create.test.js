const request = require("supertest");
const { app } = require("../../../setup/app");
const userProfileController = require("../../../../src/api/v1/userProfile/controllers");
const userProfileServices = require("../../../../src/lib/userProfile");
const {
  userProfileTestUrl,
  userProfileTestData,
} = require("../../../testSeed/userProfile");
// Mock service methods
jest.mock("../../../../src/lib/userProfile", () => ({
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
app.post(userProfileTestUrl, setTestUser, userProfileController.create);

describe("UserProfile Controller", () => {
  it("should create a new userProfile", async () => {
    // Mock the create method from your service to return a sample userProfile

    userProfileServices.create.mockResolvedValue(userProfileTestData);

    const response = await request(app)
      .post(userProfileTestUrl)
      .send(userProfileTestData);
    // console.log(response);
    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("UserProfile Created Successfully");
    expect(response.body.data).toEqual(userProfileTestData);
  });
});
