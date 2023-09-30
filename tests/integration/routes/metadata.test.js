// setup database test connection
require("../../setup/testSetup");
const { create: createMetadata } = require("../../../src/lib/metadata");
const {
  metadataData1,
  metadataData2,
  metadataTestData,
  createMetadataData,
  newMetadataData,
  updatedMetadataData,
  existingMetadataData,
  updatedDescription,
  permissionsData,
  rolesData,
} = require("../../testSeed/metadata");
const agent = require("../../agent");
const { Metadata, User, Role, Permission } = require("../../../src/models");
const { accessToken, testBaseUrl } = require("../../../src/config");
const createTestUser = require("../../setup/createTestUser");
const metadataTestBaseUrl = `${testBaseUrl}/metadata`;
const findMetadataByProperty = async (property, value) => {
  const metadata = await Metadata.findOne({ [property]: value });
  return metadata;
};
describe("Metadata API Integration Tests", () => {
  let user;

  beforeEach(async () => {
    // Create user and role
    const permissions = await Permission.create(permissionsData);
    rolesData.permissions = permissions._id;
    const role = await Role.create(rolesData);
    user = await createTestUser(role._id);

    // Create initial Metadata
    await Promise.all(
      createMetadataData.map(async (metadata) => {
        await createMetadata({ ...metadata });
      }),
    );
  });

  afterEach(async () => {
    // Clean up test data after each test case
    await Metadata.deleteMany({});
    await Role.deleteMany({});
    await Permission.deleteMany({});
    await User.deleteMany({});
  });
  describe("Create A new Metadata", () => {
    it("should create a new metadata POST", async () => {
      const response = await agent
        .post(metadataTestBaseUrl)
        .send(newMetadataData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(201);
      expect(response.body.data.title).toBe(newMetadataData.title);
      expect(response.body.data.slug).toBe(newMetadataData.slug);
      expect(response.body.data.description).toBe(newMetadataData.description);
    });
  });
  describe("Retrieve Multiple Metadata", () => {
    it("should retrieve a list of metadata GET:", async () => {
      const response = await agent.get(metadataTestBaseUrl);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.length).toBe(2);
    });
  });
  describe("Delete Multiple Metadata", () => {
    it("should delete multiple metadata by their IDs DELETE:", async () => {
      // Create test data by inserting metadata records into the database
      const metadata1 = await createMetadata({ ...metadataData1 });
      const metadata2 = await createMetadata({ ...metadataData2 });

      // Retrieve the IDs of the created metadata records
      const metadataIdsToDelete = [metadata1.id, metadata2.id];
      // Delete multiple metadata by their IDs
      const response = await agent
        .delete(metadataTestBaseUrl)
        .send({ ids: metadataIdsToDelete })
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);

      // Verify that the metadata with the specified IDs no longer exist in the database
      for (const metadataId of metadataIdsToDelete) {
        const deletedMetadata = await Metadata.findById(metadataId);
        expect(deletedMetadata).toBeNull();
      }
    });
  });
  describe("Retrieve Single Metadata", () => {
    it("should find a single metadata by its ID GET:", async () => {
      // Create a test metadata record in the database
      const testMetadata = await createMetadata({ ...metadataTestData });

      // Perform a GET request to find the metadata by its ID
      const response = await agent
        .get(`${metadataTestBaseUrl}/${testMetadata.id}`)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(200);

      // Check if the response matches the testMetadata
      expect(response.body.id).toBe(String(testMetadata.id));
      expect(response.body.data.title).toBe(testMetadata.title);
      expect(response.body.data.description).toBe(testMetadata.description);
    });
  });
  describe("Update and Delete Metadata", () => {
    it("should edit an existing metadata PATCH", async () => {
      // Find an existing metadata (assuming it exists)
      const metadataToUpdate = await findMetadataByProperty(
        "title",
        "metadata title",
      );

      // If a metadata with the specified title exists, update it
      const response = await agent
        .patch(`${metadataTestBaseUrl}/${metadataToUpdate._id}`)
        .send(updatedDescription)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.description).toBe(
        updatedMetadataData.description,
      );
    });
    it("should delete a metadata DELETE", async () => {
      const metadataToDelete = await findMetadataByProperty(
        "title",
        "metadata title",
      );

      const response = await agent
        .delete(`${metadataTestBaseUrl}/${metadataToDelete._id}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);
      expect(await Metadata.findById(metadataToDelete._id)).toBeNull();
    });
  });
});
