const { testBaseUrl, accessToken } = require("../../../src/config");
// const { newItemData } = require("../../../src/utils/data");
const request = require("supertest");
const app = require("../../../src/app/app");
const cleanupTestDatabase = require("../../setup/cleanupTests");
require("../../setup/setupTests");

describe("Item Routes", () => {
  it("should create a new item", async () => {
    const newItemData = {
      name: "string",
      description: "string",
      released: "2023-09-12",
      thumbnail: "string or id",
      subcategory: "string or id",
      state: "string or id",
      cities: ["string or id", "string or id"],
      price: 0,
      negotiable: true,
      is_argent: true,
      brand: "string or id",
    };
    const response = await request(app)
      .post(`${testBaseUrl}/items`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(newItemData);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body.data.name).toBe(newItemData.name);
    expect(response.body.data.description).toBe(newItemData.description);
  });
});
