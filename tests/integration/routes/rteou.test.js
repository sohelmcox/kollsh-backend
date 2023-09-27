const express = require("express");
const supertest = require("supertest");
const uploadRoutes = require("../../../src/routes/upload.routes");
const { create: createUpload } = require("../../../src/lib/upload");
const { testBaseUrl } = require("../../../src/config");
const agent = require("../../agent");
const uploadTestBaseUrl = `${testBaseUrl}/upload/files`;
const path = require("path");
const app = express();
app.use(express.json());
// app.use("/upload", uploadRoutes);

describe("Upload Router", () => {
  it("POST /upload should return 201 status code", async () => {
    const filePath = path.resolve(__dirname, "./dkakin.jpg");
    const response = await agent
      .post(uploadTestBaseUrl)
      .field("folderName", "testFolder")
      .field("width", 200)
      .field("height", 200)
      .attach("files", filePath); // Use the resolved file path
    // console.log(response);
    expect(response.status).toBe(201);
  });
  // Add more router tests as needed
});
