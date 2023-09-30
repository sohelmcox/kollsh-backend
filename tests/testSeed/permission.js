const { testBaseUrl } = require("../../src/config");
const permissionTestUrl = `${testBaseUrl}/permissions`;
const permissionData1 = {
  description: "Permission 1",
  controller: "string",
  actions: ["string"],
};
const permissionData2 = {
  description: "Permission 2",
  controller: "string",
  actions: ["string"],
};
const newPermissionData = {
  id: "newPermissionId",
  description: "New Permission",
  controller: "string",
  actions: ["string"],
};
const updatedPermissionData = {
  description: "Updated Permission",
  controller: "string",
  actions: ["string"],
};
const editPermissionData = {
  description: "Edit Permission",
};
const existingPermissionData = {
  description: "Existing Permission",
  controller: "string",
  actions: ["string"],
};
const existingPermission = {
  id: "existingPermissionId",
  description: "Existing Permission Name",
};
const permissionTestData = {
  id: "permissionId",
  description: "Test Permission",
  controller: "string",
  actions: ["string"],
};
const mockPermission = {
  id: "permissionId",
  description: "Test Permission",
  controller: "string",
  actions: ["string"],
};
const mockUpdatedPermission = {
  id: "permissionId",
  description: "Updated Permission",
};
const updatedDescription = { description: "Updated Permission" };
const createPermissionData = [
  {
    description: "string",
    controller: "string",
    actions: ["string"],
  },
  {
    description: "permission name",
    controller: "string",
    actions: ["string"],
  },
];
const permissionsData = {
  controller: "permission",
  actions: ["read", "write", "delete", "update"],
  description: "Read Users",
  createdBy: null,
};

const rolesData = {
  name: "admin",
  description: "Admin Role",
  permissions: [],
  createdBy: "650d880858e6f8be2bb7b421",
};
const permissionTestQuery = {
  sort: "name",
  fields: "description",
  pageSize: 10,
  pageNumber: 1,
};
module.exports = {
  permissionData1,
  permissionData2,
  newPermissionData,
  updatedPermissionData,
  editPermissionData,
  existingPermissionData,
  existingPermission,
  updatedDescription,
  permissionTestData,
  createPermissionData,
  mockPermission,
  mockUpdatedPermission,
  permissionTestUrl,
  permissionsData,
  rolesData,
  permissionTestQuery,
};
