const { testBaseUrl } = require("../../src/config");
const roleTestUrl = `${testBaseUrl}/roles`;
const roleData1 = {
  name: "Role 1",
  description: "string",
  permissions: ["6502a59b35d01ff95a2c2527"],
};
const roleData2 = {
  name: "Role 2",
  description: "string",
  permissions: ["6502a59b35d01ff95a2c2527"],
};
const newRoleData = {
  id: "newRoleId",
  name: "New Role",
  description: "Updated Description",
  permissions: ["6502a59b35d01ff95a2c2527"],
};
const updatedRoleData = {
  name: "Updated Role",
  description: "Updated Description",
  permissions: ["6502a59b35d01ff95a2c2527"],
};
const editRoleData = {
  name: "Edit Role",
  description: "Edit Description",
};
const existingRoleData = {
  name: "Existing Role",
  description: "string",
  permissions: ["6502a59b35d01ff95a2c2527"],
};
const existingRole = {
  id: "existingRoleId",
  name: "Existing Role Name",
};
const roleTestData = {
  id: "roleId",
  name: "Test Role",
  description: "Test Description",
  permissions: ["6502a59b35d01ff95a2c2527"],
};
const mockRole = {
  id: "roleId",
  name: "Test Role",
  description: "Test Description",
  permissions: ["6502a59b35d01ff95a2c2527"],
};
const mockUpdatedRole = {
  id: "roleId",
  name: "Updated Role",
  description: "Updated Description",
};
const updatedDescription = { description: "Updated Description" };
const createRoleData = [
  {
    name: "string",
    description: "string",
    permissions: ["6502a59b35d01ff95a2c2527"],
  },
  {
    name: "role name",
    description: "string",
    permissions: ["6502a59b35d01ff95a2c2527"],
  },
];
const userRole = {
  name: "user",
  description: "this is a user role",
  permissions: ["6502a59b35d01ff95a2c2527"],
  createdBy: "6502a59b35d01ff95a2c2527",
};
const permissionsData = {
  controller: "role",
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
const roleTestQuery = {
  sort: "name",
  fields: "name,description",
  pageSize: 10,
  pageNumber: 1,
};
module.exports = {
  roleData1,
  roleData2,
  newRoleData,
  updatedRoleData,
  editRoleData,
  existingRoleData,
  existingRole,
  updatedDescription,
  roleTestData,
  createRoleData,
  mockRole,
  mockUpdatedRole,
  roleTestUrl,
  userRole,
  permissionsData,
  rolesData,
  roleTestQuery,
};
