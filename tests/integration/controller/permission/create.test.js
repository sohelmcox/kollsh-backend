const request = require("supertest");
const { app } = require("../../../setup/app");
const permissionController = require("../../../../src/api/v1/permission/controllers");
const permissionServices = require("../../../../src/lib/permission");
const {
  permissionTestUrl,
  permissionTestData,
} = require("../../../testSeed/permission");
const { accessToken } = require("../../../../src/config");
// Mock service methods
jest.mock("../../../../src/lib/permission", () => ({
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
app.post(permissionTestUrl, setTestUser, permissionController.create);
// TODO: fix this test
describe("Permission Controller", () => {
  it("should create a new permission", async () => {
    // Mock the create method from your service to return a sample permission

    permissionServices.create.mockResolvedValue(permissionTestData);

    const response = await request(app)
      .post(permissionTestUrl)
      .send(permissionTestData)
      .set("authorization", `Bearer ${accessToken}`);
    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("Permission Created Successfully");
    expect(response.body.data).toEqual(permissionTestData);
  });
});
