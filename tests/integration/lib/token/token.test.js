const jwt = require("jsonwebtoken");
const {
  generateToken,
  decodeToken,
  verifyToken,
} = require("../../../../src/lib/token");
const config = require("../../../../src/config");

const error = require("../../../../src/utils/error");

describe("Token Functions", () => {
  const testPayload = { userId: "123", name: "test" };
  const testSecret = config.accessTokenSecret;

  it("should generate a valid JWT token", () => {
    const token = generateToken({ payload: testPayload, secret: testSecret });
    const decoded = jwt.decode(token, { algorithms: ["HS256"] });

    expect(decoded.userId).toBe(testPayload.userId);
  });

  it("should decode a valid JWT token", () => {
    const token = jwt.sign(testPayload, testSecret, { algorithm: "HS256" });
    const decoded = decodeToken({ token, algorithm: "HS256" });

    expect(decoded.userId).toBe(testPayload.userId);
  });

  it("should verify a valid JWT token", () => {
    const token = jwt.sign(testPayload, testSecret, { algorithm: "HS256" });
    const verified = verifyToken({
      token,
      secret: testSecret,
      algorithm: "HS256",
    });

    expect(verified.userId).toBe(testPayload.userId);
  });
});
// TODO: Fix this test
