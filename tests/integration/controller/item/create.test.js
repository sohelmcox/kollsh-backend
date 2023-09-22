const request = require("supertest");
const { app } = require("../../../setup/app");
const itemController = require("../../../../src/api/v1/item/controllers");
const itemService = require("../../../../src/lib/item");
const { itemTestUrl, itemTestData } = require("../../../testSeed/item");
// Mock service methods
jest.mock("../../../../src/lib/item", () => ({
  create: jest.fn(),
}));

describe("create Controller", () => {
  it("should create a new item and return a 201 status code", async () => {
    // Mock request and response objects
    const req = {
      body: {
        ...itemTestData,
      },
      user: {
        id: "user123",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Mock the response from itemService.create
    const mockResponse = { id: "item123", name: "Example Item" };
    itemService.create.mockResolvedValue(mockResponse);

    // Call the create controller function
    await itemController.create(req, res, next);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockResponse);
    expect(next).not.toHaveBeenCalled();
  });

  it("should handle errors and call the next middleware", async () => {
    // Mock request and response objects
    const req = {
      body: {
        ...itemTestData,
      },
      user: {
        id: "user123",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Mock the error from itemService.create
    const mockError = new Error("Item creation failed");
    itemService.create.mockRejectedValue(mockError);

    // Call the create controller function
    await itemController.create(req, res, next);

    // Assertions
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(mockError);
  });
});
