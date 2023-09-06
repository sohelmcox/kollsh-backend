const generateUUID = require("../../../src/utils/generateUniqueCode"); // Replace with the actual path to your generateUUID.js file

describe("generateUUID", () => {
  it("should generate a valid UUID", () => {
    const uuid = generateUUID();
    // Regular expression to match a UUID format
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(uuid).toMatch(uuidRegex);
  });
});
