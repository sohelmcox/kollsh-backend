const { selectFields } = require("../../../../src/utils/Query/selectField");

describe("selectFields", () => {
  it("should select specified fields for each item", () => {
    // Sample data
    const items = [
      { id: 1, name: "Item 1", price: 10, description: "Description 1" },
      { id: 2, name: "Item 2", price: 20, description: "Description 2" },
    ];

    // Fields to select
    const selectedFields = ["name", "price"];

    // Expected result
    const expected = [
      { id: 1, name: "Item 1", price: 10 },
      { id: 2, name: "Item 2", price: 20 },
    ];

    const result = selectFields(items, selectedFields);

    expect(result).toEqual(expected);
  });

  it("should return an empty array when no items are provided", () => {
    // No items provided
    const items = [];

    // Fields to select
    const selectedFields = ["name", "price"];

    const result = selectFields(items, selectedFields);

    expect(result).toEqual([]);
  });

  it("should return an empty array when no fields are specified", () => {
    // Sample data
    const items = [
      { id: 1, name: "Item 1", price: 10, description: "Description 1" },
      { id: 2, name: "Item 2", price: 20, description: "Description 2" },
    ];

    // No fields specified
    const selectedFields = [];

    const result = selectFields(items, selectedFields);

    expect(result).toEqual([]);
  });

  it("should handle missing fields gracefully", () => {
    // Sample data with missing fields
    const items = [
      { id: 1, name: "Item 1", description: "Description 1" },
      { id: 2, name: "Item 2", price: 20 },
    ];

    // Fields to select
    const selectedFields = ["name", "price"];

    // Expected result with missing fields set to undefined
    const expected = [
      { id: 1, name: "Item 1", price: undefined },
      { id: 2, name: "Item 2", price: 20 },
    ];

    const result = selectFields(items, selectedFields);

    expect(result).toEqual(expected);
  });
});
