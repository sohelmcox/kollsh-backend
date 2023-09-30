const { testBaseUrl } = require("../../src/config");
const uploadTestUrl = `${testBaseUrl}/upload/files`;
const uploadData1 = {
  alternativeText: "Upload 1",
  asset_id: "a5679775021578f7dc6ad99643f552d9",
  public_id: "2023-09-18_whatsapp-image-2023-09-18-at-1",
  alternativeText: "whatsapp image 2023-09-18 at 1",
  caption: "files",
  width: 400,
  height: 400,
  folder: "items",
  resource_type: "image",
  format: "jpg",
  size: 29906,
  url: "https://res.cloudinary.com/serabuy-com/image/upload/v1695042163/2023-09-18_whatsapp-image-2023-09-18-at-1.jpg",
};
const uploadData2 = {
  alternativeText: "Upload 2",
  asset_id: "a5679775021578f7dc6ad99643f552d9",
  public_id: "2023-09-18_whatsapp-image-2023-09-18-at-1",
  alternativeText: "whatsapp image 2023-09-18 at 1",
  caption: "files",
  width: 400,
  height: 400,
  folder: "items",
  resource_type: "image",
  format: "jpg",
  size: 29906,
  url: "https://res.cloudinary.com/serabuy-com/image/upload/v1695042163/2023-09-18_whatsapp-image-2023-09-18-at-1.jpg",
};
const newUploadData = {
  id: "6502a59b35d01ff95a2c2527",
  alternativeText: "New Upload",
  asset_id: "a5679775021578f7dc6ad99643f552d9",
  public_id: "2023-09-18_whatsapp-image-2023-09-18-at-1",
  alternativeText: "whatsapp image 2023-09-18 at 1",
  caption: "files",
  width: 400,
  height: 400,
  folder: "items",
  resource_type: "image",
  format: "jpg",
  size: 29906,
  url: "https://res.cloudinary.com/serabuy-com/image/upload/v1695042163/2023-09-18_whatsapp-image-2023-09-18-at-1.jpg",
};
const updatedUploadData = {
  alternativeText: "Updated Upload",
  asset_id: "a5679775021578f7dc6ad99643f552d9",
  public_id: "2023-09-18_whatsapp-image-2023-09-18-at-1",
  alternativeText: "whatsapp image 2023-09-18 at 1",
  caption: "files",
  width: 400,
  height: 400,
  folder: "items",
  resource_type: "image",
  format: "jpg",
  size: 29906,
  url: "https://res.cloudinary.com/serabuy-com/image/upload/v1695042163/2023-09-18_whatsapp-image-2023-09-18-at-1.jpg",
};
const editUploadData = {
  alternativeText: "Edit Upload",
  caption: "files",
};

const existingUpload = {
  id: "6502a59b35d01ff95a2c2527",
  alternativeText: "Existing Upload Name",
};
const uploadTestData = {
  id: "6502a59b35d01ff95a2c2527",
  asset_id: "a5679775021578f7dc6ad99643f552d9",
  public_id: "2023-09-18_whatsapp-image-2023-09-18-at-1",
  alternativeText: "whatsapp image 2023-09-18 at 1",
  caption: "files",
  width: 400,
  height: 400,
  folder: "items",
  resource_type: "image",
  format: "jpg",
  size: 29906,
  url: "https://res.cloudinary.com/serabuy-com/image/upload/v1695042163/2023-09-18_whatsapp-image-2023-09-18-at-1.jpg",
};
const mockUpload = {
  id: "6502a59b35d01ff95a2c2527",
  alternativeText: "Test Upload",
  asset_id: "a5679775021578f7dc6ad99643f552d9",
  public_id: "2023-09-18_whatsapp-image-2023-09-18-at-1",
  alternativeText: "whatsapp image 2023-09-18 at 1",
  caption: "files",
  width: 400,
  height: 400,
  folder: "items",
  resource_type: "image",
  format: "jpg",
  size: 29906,
  url: "https://res.cloudinary.com/serabuy-com/image/upload/v1695042163/2023-09-18_whatsapp-image-2023-09-18-at-1.jpg",
};
const mockUpdatedUpload = {
  id: "uploadId",
  alternativeText: "Updated Upload",
  caption: "files",
};
const updatedCaption = { caption: "Updated Caption" };
const createUploadData = [
  {
    alternativeText: "string",
    files: ["file1", "file"],
    asset_id: "a5679775021578f7dc6ad99643f552d9",
    public_id: "2023-09-18_whatsapp-image-2023-09-18-at-1",
    caption: "files",
    width: 400,
    height: 400,
    folder: "items",
    resource_type: "image",
    format: "jpg",
    size: 29906,
    url: "https://res.cloudinary.com/serabuy-com/image/upload/v1695042163/2023-09-18_whatsapp-image-2023-09-18-at-1.jpg",
  },
  {
    alternativeText: "upload name",
    asset_id: "a5679775021578f7dc6ad99643f552d9",
    public_id: "2023-09-18_whatsapp-image-2023-09-18-at-1",
    files: ["file1", "file"],
    caption: "files",
    width: 400,
    height: 400,
    folder: "items",
    resource_type: "image",
    format: "jpg",
    size: 29906,
    url: "https://res.cloudinary.com/serabuy-com/image/upload/v1695042163/2023-09-18_whatsapp-image-2023-09-18-at-1.jpg",
  },
];
const permissionsData = {
  controller: "upload",
  actions: ["read", "write", "delete", "update"],
  description: "Read Users",
  createdBy: null,
};

const rolesData = {
  name: "user",
  description: "User Role",
  permissions: [],
  createdBy: "650d880858e6f8be2bb7b421",
};
const uploadTestQuery = {
  sort: "name",
  fields: "name,caption",
  pageSize: 10,
  pageNumber: 1,
};
module.exports = {
  uploadData1,
  uploadData2,
  newUploadData,
  updatedUploadData,
  editUploadData,
  existingUpload,
  updatedCaption,
  uploadTestData,
  createUploadData,
  mockUpload,
  mockUpdatedUpload,
  uploadTestUrl,
  permissionsData,
  rolesData,
  uploadTestQuery,
};
