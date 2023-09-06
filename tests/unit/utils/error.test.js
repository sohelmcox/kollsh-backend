const {
  notFound,
  badRequest,
  serverError,
  authenticationError,
  authorizationError,
} = require("../../../src/utils/error");

describe("Error Handling Functions", () => {
  it("should create a Not Found error", () => {
    const error = notFound("Resource not found");
    expect(error.name).toBe("Not Found");
    expect(error.message).toBe("Resource not found");
    expect(error.status).toBe(404);
  });

  it("should create a Bad Request error", () => {
    const error = badRequest("Bad Request");
    expect(error.name).toBe("Bad Request");
    expect(error.message).toBe("Bad Request");
    expect(error.status).toBe(400);
  });

  it("should create a Server Error", () => {
    const error = serverError("Internal Server Error");
    expect(error.name).toBe("Server Error");
    expect(error.message).toBe("Internal Server Error");
    expect(error.status).toBe(500);
  });

  it("should create an Authentication Error", () => {
    const error = authenticationError("Authentication Failed");
    expect(error.name).toBe("Authentication Error");
    expect(error.message).toBe("Authentication Failed");
    expect(error.status).toBe(401);
  });

  it("should create an Authorization Error", () => {
    const error = authorizationError("Permission Denied");
    expect(error.message).toBe("Permission Denied");
    expect(error.status).toBe(403);
  });
});
