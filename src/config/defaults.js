const defaults = {
  totalItems: 0,
  pageSize: 25,
  pageNumber: 1,
  sortOrder: "asc",
  sortBy: "updatedAt",
  search: "",
  radix: 10,
  // Item
  ItemsAllowedSearchFields: ["name", "description"],
  itemAllowedSorByFields: [
    "name",
    "updatedAt",
    "createdAt",
    "price",
    "quantity",
  ],
  // upload
  uploadAllowedSorByFields: [
    "alternativeText",
    "size",
    "width",
    "height",
    "updatedAt",
    "createdAt",
  ],
  uploadAllowedSearchFields: [
    "alternativeText",
    "size",
    "width",
    "height",
    "format",
    "folder",
    "updatedAt",
  ],
  //role
  roleAllowedSearchFields: ["name", "description"],
  roleAllowedSorByFields: ["name", "updatedAt", "createdAt"],

  //permission
  permissionAllowedSearchFields: ["controller", "description"],
  permissionAllowedSorByFields: [
    "controller",
    "description",
    "updatedAt",
    "createdAt",
  ],
};

module.exports = Object.freeze(defaults);
