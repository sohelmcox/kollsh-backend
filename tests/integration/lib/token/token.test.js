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

  // TODO: Fix this test
  // it("should throw an error for an invalid token", () => {
  //   const invalidToken = "invalidToken";

  //   // For generateToken, it will throw a serverError due to the invalid secret
  //   expect(() =>
  //     generateToken({ payload: testPayload, secret: "invalidSecret" }),
  //   ).toThrowError("Internal Server Error"); // Match the exact error message

  //   // For decodeToken and verifyToken, it will throw a serverError due to the invalid token
  //   expect(() => decodeToken({ token: invalidToken })).toThrowError(
  //     "Internal Server Error",
  //   ); // Match the exact error message
  //   expect(() => verifyToken({ token: invalidToken })).toThrowError(
  //     "Internal Server Error",
  //   ); // Match the exact error message
  // });
});

// describe("Token Functions", () => {
//   const testPayload = { userId: "123", name: "test" };
//   const testSecret = config.accessTokenSecret;

//   it("should generate a valid JWT token", () => {
//     const token = generateToken({ payload: testPayload, secret: testSecret });
//     const decoded = jwt.decode(token, { algorithms: ["HS256"] });

//     expect(decoded.userId).toBe(testPayload.userId);
//   });

//   it("should decode a valid JWT token", () => {
//     const token = jwt.sign(testPayload, testSecret, { algorithm: "HS256" });
//     const decoded = decodeToken({ token, algorithm: "HS256" });

//     expect(decoded.userId).toBe(testPayload.userId);
//   });

//   it("should verify a valid JWT token", () => {
//     const token = jwt.sign(testPayload, testSecret, { algorithm: "HS256" });
//     const verified = verifyToken({
//       token,
//       secret: testSecret,
//       algorithm: "HS256",
//     });

//     expect(verified.userId).toBe(testPayload.userId);
//   });

//   // it("should throw an error for an invalid token", () => {
//   //   const invalidToken = "invalidToken";
//   //   try {
//   //     generateToken({ payload: testPayload, secret: "invalidSecret" }),
//   //       // If no error is thrown, fail the test
//   //       fail("Internal Server Error");
//   //   } catch (error) {
//   //     expect(error.name).toBe("ServerError");
//   //     expect(error.message).toBe("Internal Server Error");
//   //     expect(error.status).toBe(500);
//   //     expect(error.details).toEqual({});
//   //   }
//   //   try {
//   //     decodeToken({ token: invalidToken });
//   //     // If no error is thrown, fail the test
//   //     fail("Internal Server Error");
//   //   } catch (error) {
//   //     expect(error.name).toBe("ServerError");
//   //     expect(error.message).toBe("Internal Server Error");
//   //     expect(error.status).toBe(500);
//   //     expect(error.details).toEqual({});
//   //   }
//   //   // // For generateToken, it will throw a serverError due to the invalid secret
//   //   // expect(() =>
//   //   //   generateToken({ payload: testPayload, secret: "invalidSecret" }),
//   //   // ).toThrowError("Internal Server Error");

//   //   // // For decodeToken and verifyToken, it will throw a serverError due to the invalid token
//   //   // expect(() => decodeToken({ token: invalidToken })).toThrowError(
//   //   //   "Internal Server Error",
//   //   // );
//   //   // expect(() => verifyToken({ token: invalidToken })).toThrowError(
//   //   //   "Internal Server Error",
//   //   // );
//   // });
// });
