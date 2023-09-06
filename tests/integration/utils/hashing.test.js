const { generateHash, hashMatched } = require("../../../src/utils/hashing");
const bcrypt = require("bcryptjs");

jest.mock("bcryptjs"); // Mock the bcrypt library

describe("Password Utilities Integration Tests", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocked function calls after each test
  });

  it("should generate a hash for a password", async () => {
    // Arrange
    const rawPassword = "myPassword";
    const saltRound = 10;
    const mockSalt = "mockedSalt";
    const mockHash = "mockedHash";
    bcrypt.genSalt.mockResolvedValue(mockSalt);
    bcrypt.hash.mockResolvedValue(mockHash);

    // Act
    const hashedPassword = await generateHash(rawPassword, saltRound);

    // Assert
    expect(bcrypt.genSalt).toHaveBeenCalledWith(saltRound);
    expect(bcrypt.hash).toHaveBeenCalledWith(rawPassword, mockSalt);
    expect(hashedPassword).toBe(mockHash);
  });

  it("should match a raw password with a hashed password", async () => {
    // Arrange
    const rawPassword = "myPassword";
    const hashedPassword = "hashedPassword";
    const mockResult = true;
    bcrypt.compare.mockResolvedValue(mockResult);

    // Act
    const passwordMatches = await hashMatched(rawPassword, hashedPassword);

    // Assert
    expect(bcrypt.compare).toHaveBeenCalledWith(rawPassword, hashedPassword);
    expect(passwordMatches).toBe(mockResult);
  });
});
