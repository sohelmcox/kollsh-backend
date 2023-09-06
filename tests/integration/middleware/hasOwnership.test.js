const mongoose = require("mongoose");
const hasOwnership = require("../../../src/middleware/hasOwnership");
const { findUserById } = require("../../../src/lib/user");

jest.mock("../../../src/lib/user");

describe("hasOwnership middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: { id: "resourceId" },
      user: { id: "userId" },
    };
    res = {};
    next = jest.fn();
    jest.clearAllMocks();
  });

  it("should pass if the user owns the resource", async () => {
    const resourceModel = "Resource";
    const ownerIdField = "ownerId";

    findUserById.mockResolvedValue({ _id: "userId" });
    const findByIdMock = jest.fn().mockResolvedValue({ ownerId: "userId" });
    mongoose.model = jest.fn(() => ({ findById: findByIdMock }));

    await hasOwnership(resourceModel, ownerIdField)(req, res, next);

    expect(findUserById).toHaveBeenCalledWith("userId");
    expect(mongoose.model).toHaveBeenCalledWith("Resource");
    expect(findByIdMock).toHaveBeenCalledWith("resourceId");
    expect(next).toHaveBeenCalledWith();
  });
});
