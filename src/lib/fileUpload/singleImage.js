// services/uploadService.js
const AWS = require("aws-sdk");
const uuid = require("uuid");
const sizeOf = require("image-size"); // For image dimensions
const multer = require("multer");
const config = require("../../config");

AWS.config.update({
  accessKeyId: config.awsAccessKeyId,
  secretAccessKey: config.awsSecretAccessKey,
  region: config.awsRegion,
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file size to 5MB
  },
});
module.exports = upload;

// exports.uploadFile = async (fileData) => {
//   try {
//     const uniqueFilename = uuid.v4(); // Generate a unique filename

//     // Set up parameters for S3 upload
//     const params = {
//       Bucket: config.bucketName,
//       Key: `uploads/${uniqueFilename}-${fileData.originalname}`,
//       Body: fileData.buffer, // Use the file buffer as the body
//     };

//     // Upload the file to S3
//     const s3Data = await s3.upload(params).promise();
//     // Check the file type (e.g., image/jpeg, image/png)
//     const fileType = fileData.mimetype;

//     // Check the file dimensions (width and height)
//     const dimensions = sizeOf(fileData.buffer);
//     const { width } = dimensions;
//     const { height } = dimensions;

//     // Check the file size in bytes (e.g., 1 MB = 1024 * 1024 bytes)
//     const maxSizeBytes = 5 * 1024 * 1024; // 5 MB as an example (adjust as needed)

//     // Implement your validation logic here
//     // Example: Check if it's an image, dimensions meet your requirements, and size is within limits
//     if (
//       !fileType.startsWith("image/") ||
//       width < 100 ||
//       height < 100 ||
//       fileData.size > maxSizeBytes
//     ) {
//       return res
//         .status(400)
//         .json({ message: "Invalid file type, width, height, or size" });
//     }

//     // Implement validation and processing logic here
//     // Example: Check file type, dimensions, and size
//     // Example: Create a database record for the uploaded file

//     // Create additional data to include in the response
//     const additionalData = {
//       description: "This is an example of additional data",
//       user: "John Doe",
//       // Add any other data you need
//     };
//     const uploadFile = {
//       name: fileData.originalname,
//       size: fileData.size,
//       url: s3Data.Location,
//       alternativeText: "", // Add alternative text if needed
//       fileType,
//       filename: s3Data.Key,
//       folder: "uploads", // Specify the folder if needed
//       previewUrl: "", // Add preview URL if needed
//       width,
//       height,
//       size: fileData.size, // Add the file size
//     };
//     // Create the response object with additional data
//     const uploadResult = {
//       message: "File uploaded successfully",
//       fileUrl: s3Data.Location,
//       additionalData, // Include additional data in the response
//     };

//     return uploadResult;
//   } catch (error) {
//     console.error("Error uploading to S3:", error);
//     throw new Error("Internal server error");
//   }
// };
