// setup database test connection
require("../../setup/testSetup");
const { create: createUpload } = require("../../../src/lib/upload");
const {
  uploadData1,
  uploadData2,
  uploadTestData,
  createUploadData,
  newUploadData,
  updatedUploadData,
  updatedDescription,
} = require("../../testSeed/upload");
const agent = require("../../agent");
const { Upload, User } = require("../../../src/models");
const { accessToken, testBaseUrl } = require("../../../src/config");
const createTestUser = require("../../setup/createTestUser");
const uploadTestBaseUrl = `${testBaseUrl}/upload/files`;
const findUploadByProperty = async (property, value) => {
  const upload = await Upload.findOne({ [property]: value });
  return upload;
};
describe("Upload API Integration Tests", () => {
  beforeEach(async () => {
    createUploadData.forEach(async (upload) => {
      await Upload.create({ ...upload });
    });
    await createTestUser();
  });

  afterEach(async () => {
    // Clean up test data after each test case
    await Upload.deleteMany({});
    await User.deleteMany({});
  });
  // TODO: fix upload route
  describe("Create A new Upload", () => {
    // it("should create a new upload POST", async () => {
    //   const response = await agent
    //     .post(uploadTestBaseUrl)
    //     .send(newUploadData)
    //     .set("Accept", "application/json")
    //     .set("Authorization", `Bearer ${accessToken}`);
    //   expect(response.statusCode).toBe(201);
    //   // expect(response.body.data.name).toBe(newUploadData.name);
    //   // expect(response.body.data.slug).toBe(newUploadData.slug);
    //   // expect(response.body.data.description).toBe(newUploadData.description);
    // });
    // it("should successfully upload files", async () => {
    //   // Mock any service functions if needed
    //   // For example, if uploadService.create is called within your controller
    //   // Use supertest to make a POST request with files attached
    //   const response = await agent
    //     .post(uploadTestBaseUrl)
    //     .attach("files", "./dkakin.jpg") // Attach a file for testing
    //     .field("folderName", "uploads")
    //     .field("width", 100)
    //     .field("height", 100);
    //   console.log(response);
    //   // Perform assertions based on the response
    //   expect(response.status).toBe(201); // Adjust the status code as needed
    //   expect(response.body.message).toBe("Successfully Uploaded File");
    //   // You can add more assertions if your response contains additional data
    //   // Optionally, you can assert that your controller function was called with the expected arguments
    //   // For example, if uploadService.create is called within your controller
    //   // expect(uploadService.create).toHaveBeenCalledWith({
    //   //   folderName: 'uploads',
    //   //   givenFileWidth: 100,
    //   //   givenFileHeight: 100,
    //   //   files: [/* array of uploaded files */],
    //   // });
    // });
  });
  describe("Retrieve Multiple Uploads", () => {
    it("should retrieve a list of uploads GET:", async () => {
      const response = await agent.get(uploadTestBaseUrl);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.length).toBe(2);
    });
  });
  describe("Delete Multiple Uploads", () => {
    it("should delete multiple uploads by their IDs DELETE:", async () => {
      // Create test data by inserting upload records into the database
      const upload1 = await Upload.create({ ...uploadData1 });
      const upload2 = await Upload.create({ ...uploadData2 });

      // Retrieve the IDs of the created upload records
      const uploadIdsToDelete = [upload1.id, upload2.id];
      // Delete multiple uploads by their IDs
      const response = await agent
        .delete(uploadTestBaseUrl)
        .send({ ids: uploadIdsToDelete })
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(202);

      // Verify that the uploads with the specified IDs no longer exist in the database
      for (const uploadId of uploadIdsToDelete) {
        const deletedUpload = await Upload.findById(uploadId);
        expect(deletedUpload).toBeNull();
      }
    });
  });
  describe("Retrieve Single Uploads", () => {
    it("should find a single upload by its ID GET:", async () => {
      // Create a test upload record in the database
      const testUpload = await Upload.create({ ...uploadTestData });

      // Perform a GET request to find the upload by its ID
      const response = await agent
        .get(`${uploadTestBaseUrl}/${testUpload.id}`)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(200);

      // Check if the response matches the testUpload
      expect(response.body.id).toBe(String(testUpload.id));
    });
  });
  describe(" Delete Uploads", () => {
    it("should delete a upload DELETE", async () => {
      const uploadToDelete = await findUploadByProperty(
        "alternativeText",
        "string",
      );
      const response = await agent
        .delete(`${uploadTestBaseUrl}/${uploadToDelete._id}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(202);
      expect(await Upload.findById(uploadToDelete._id)).toBeNull();
    });
  });
});
