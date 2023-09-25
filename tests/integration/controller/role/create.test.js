const request = require("supertest");
const { app } = require("../../../setup/app");
const roleController = require("../../../../src/api/v1/role/controllers");
const roleServices = require("../../../../src/lib/role");
const { roleTestUrl, roleTestData } = require("../../../testSeed/role");
// Mock service methods
jest.mock("../../../../src/lib/role", () => ({
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
app.post(roleTestUrl, setTestUser, roleController.create);
// TODO: fix this controller

describe("Role Controller", () => {
  it("should create a new role", async () => {
    // Mock the create method from your service to return a sample role

    roleServices.create.mockResolvedValue(roleTestData);

    const response = await request(app).post(roleTestUrl).send(roleTestData);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("Role Created Successfully");
    expect(response.body.data).toEqual(roleTestData);
  });
});
