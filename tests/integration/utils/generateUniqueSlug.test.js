const config = require("../../../src/config");
const { Item } = require("../../../src/models");
const mongoose = require("mongoose");
const testSetup = require("../setup/testSetup");
const { generateUniqueSlug } = require("../../../src/utils/generateUniqueSlug");

describe("generateUniqueSlug", () => {
  beforeAll(async () => {
    // Connect to the test database
    await testSetup.connectDatabase();
  });

  afterAll(async () => {
    // Disconnect from the test database
    await testSetup.disconnectDatabase();
  });

  beforeEach(async () => {
    // Set up the test database environment
    await testSetup.setupDatabase();
  });
  it("should generate a unique slug for a given string", async () => {
    const inputString = "Test String";
    const expectedSlug = "test-string";
    const result = await generateUniqueSlug(Item, inputString);

    // Ensure the result is the expected unique slug
    expect(result).toBe(expectedSlug);
  });

  it("should generate a unique slug with a count for a duplicate string", async () => {
    const inputString = "Item";
    const expectedSlug = "item-2";
    const result = await generateUniqueSlug(Item, inputString);

    // Ensure the result is the expected unique slug
    expect(result).toBe(expectedSlug);
  });
});
