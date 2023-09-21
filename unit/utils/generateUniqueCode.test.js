const generateUniqueCode = require("../../../src/utils/generateUniqueCode");

describe("generateUniqueCode", () => {
  it("should generate a valid UUID", () => {
    const uuid = generateUniqueCode();
    // Regular expression to match a UUID format
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(uuid).toMatch(uuidRegex);
  });
});
