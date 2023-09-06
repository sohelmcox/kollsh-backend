const { slugify } = require("../../../src/utils/generateUniqueSlug");

describe("slugify", () => {
  it("should convert a string to a valid slug", () => {
    const input = "This is a Test String!";
    const expectedSlug = "this-is-a-test-string";
    const result = slugify(input);
    expect(result).toBe(expectedSlug);
  });
});
