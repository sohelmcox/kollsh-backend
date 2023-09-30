const { testBaseUrl } = require("../../src/config");
const userProfileTestUrl = `${testBaseUrl}/user-profile`;
const userProfileData1 = {
  firstName: "UserProfile 1",
  lastName: "Doe",
  boi: "string",
  country: "6502a59b35d01ff95a2c2527",
  state: "6502a69b35d01ff95a2c2528",
  city: "6501a69b35d01ff95a2c2529",
  avatar: "6501a69b34d01ff95a2c2524",
  social_link: [
    {
      platform: "string",
      link: "string",
    },
  ],
  user: "6501a39b34d91ff95a2c2521",
};
const userProfileData2 = {
  firstName: "UserProfile 2",
  lastName: "Doe",
  boi: "string",
  country: "6502a59b35d01ff95a2c2527",
  state: "6502a69b35d01ff95a2c2528",
  city: "6501a69b35d01ff95a2c2529",
  avatar: "6501a69b34d01ff95a2c2524",
  social_link: [
    {
      platform: "string",
      link: "string",
    },
  ],
  user: "6501a39b34d91ff95a2c2521",
};
const newUserProfileData = {
  id: "newUserProfileId",
  firstName: "New UserProfile",
  lastName: "Doe",
  boi: "string",
  country: "6502a59b35d01ff95a2c2527",
  state: "6502a69b35d01ff95a2c2528",
  city: "6501a69b35d01ff95a2c2529",
  avatar: "6501a69b34d01ff95a2c2524",
  social_link: [
    {
      platform: "string",
      link: "string",
    },
  ],
  user: "6501a39b34d91ff95a2c2521",
};
const updatedUserProfileData = {
  firstName: "Updated UserProfile",
  lastName: "Updated LastName",
  boi: "string",
  country: "6502a59b35d01ff95a2c2527",
  state: "6502a69b35d01ff95a2c2528",
  city: "6501a69b35d01ff95a2c2529",
  avatar: "6501a69b34d01ff95a2c2524",
  social_link: [
    {
      platform: "string",
      link: "string",
    },
  ],
  user: "6501a39b34d91ff95a2c2521",
};
const editUserProfileData = {
  firstName: "Edit UserProfile",
  lastName: "Edit LastName",
};
const existingUserProfileData = {
  firstName: "Existing UserProfile",
  lastName: "Doe",
  boi: "string",
  country: "6502a59b35d01ff95a2c2527",
  state: "6502a69b35d01ff95a2c2528",
  city: "6501a69b35d01ff95a2c2529",
  avatar: "6501a69b34d01ff95a2c2524",
  social_link: [
    {
      platform: "string",
      link: "string",
    },
  ],
  user: "6501a39b34d91ff95a2c2521",
};
const existingUserProfile = {
  id: "existingUserProfileId",
  firstName: "Existing UserProfile Name",
};
const userProfileTestData = {
  id: "userProfileId",
  firstName: "Test UserProfile",
  lastName: "Doe",
  boi: "string",
  country: "6502a59b35d01ff95a2c2527",
  state: "6502a69b35d01ff95a2c2528",
  city: "6501a69b35d01ff95a2c2529",
  avatar: "6501a69b34d01ff95a2c2524",
  social_link: [
    {
      platform: "string",
      link: "string",
    },
  ],
  user: "6501a39b34d91ff95a2c2521",
};
const mockUserProfile = {
  id: "userProfileId",
  firstName: "Test UserProfile",
  lastName: "Doe",
  boi: "string",
  country: "6502a59b35d01ff95a2c2527",
  state: "6502a69b35d01ff95a2c2528",
  city: "6501a69b35d01ff95a2c2529",
  avatar: "6501a69b34d01ff95a2c2524",
  social_link: [
    {
      platform: "string",
      link: "string",
    },
  ],
  user: "6501a39b34d91ff95a2c2521",
};
const mockUpdatedUserProfile = {
  id: "userProfileId",
  firstName: "Updated UserProfile",
  lastName: "Updated LastName",
};
const updatedLastName = { lastName: "Updated LastName" };
const createUserProfileData = [
  {
    firstName: "string",
    lastName: "Doe",
    boi: "string",
    country: "6502a59b35d01ff95a2c2527",
    state: "6502a69b35d01ff95a2c2528",
    city: "6501a69b35d01ff95a2c2529",
    avatar: "6501a69b34d01ff95a2c2524",
    social_link: [
      {
        platform: "string",
        link: "string",
      },
    ],
    user: "6501a39b34d91ff95a2c2521",
  },
  {
    firstName: "userProfile name",
    lastName: "Doe",
    boi: "string",
    country: "6502a59b35d01ff95a2c2527",
    state: "6502a69b35d01ff95a2c2528",
    city: "6501a69b35d01ff95a2c2529",
    avatar: "6501a69b34d01ff95a2c2524",
    social_link: [
      {
        platform: "string",
        link: "string",
      },
    ],
    user: "6501a39b34d91ff95a2c2521",
  },
];
const permissionsData = {
  controller: "userProfile",
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
const userProfileTestQuery = {
  sort: "name",
  fields: "firsName,lastName",
  pageSize: 10,
  pageNumber: 1,
};
module.exports = {
  userProfileData1,
  userProfileData2,
  newUserProfileData,
  updatedUserProfileData,
  editUserProfileData,
  existingUserProfileData,
  existingUserProfile,
  updatedLastName,
  userProfileTestData,
  createUserProfileData,
  mockUserProfile,
  mockUpdatedUserProfile,
  userProfileTestUrl,
  permissionsData,
  rolesData,
  userProfileTestQuery,
};
