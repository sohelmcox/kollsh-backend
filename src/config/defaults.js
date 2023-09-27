const defaults = {
  totalItems: 0,
  pageSize: 25,
  pageNumber: 1,
  sortOrder: "asc",
  sortBy: "updatedAt",
  search: "",
  radix: 10,
  totalEntities: 0,
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
  //comment
  commentAllowedSearchFields: ["content", "id"],
  commentAllowedSorByFields: ["content", "updatedAt", "createdAt"],

  //itemDetails
  itemDetailsAllowedSearchFields: ["item", "description"],
  itemDetailsAllowedSorByFields: ["item", "updatedAt", "createdAt"],
  //state
  stateAllowedSearchFields: ["name", "country"],
  stateAllowedSorByFields: ["name", "updatedAt", "createdAt"],

  //city
  cityAllowedSearchFields: ["name", "priority"],
  cityAllowedSorByFields: ["name", "priority", "updatedAt", "createdAt"],
  //country
  countryAllowedSearchFields: ["name", "code"],
  countryAllowedSorByFields: ["name", "code", "updatedAt", "createdAt"],
  //brand
  brandAllowedSearchFields: ["name", "priority", "description"],
  brandAllowedSorByFields: ["name", "priority", "updatedAt", "createdAt"],
  //category
  categoryAllowedSearchFields: ["name", "priority"],
  categoryAllowedSorByFields: ["name", "priority", "updatedAt", "createdAt"],
  //subcategory
  subcategoryAllowedSearchFields: ["name", "priority"],
  subcategoryAllowedSorByFields: ["name", "priority", "updatedAt", "createdAt"],
  //attribute
  attributeAllowedSearchFields: ["name"],
  attributeAllowedSorByFields: ["name", "updatedAt", "createdAt"],
  //attributeValue
  attributeValueAllowedSearchFields: ["name", "value", "color_code"],
  attributeValueAllowedSorByFields: [
    "name",
    "value",
    "color_code",
    "updatedAt",
    "createdAt",
  ],
  //user
  userAllowedSearchFields: ["name", "username", "email", "blocked", "confirm"],
  userAllowedSorByFields: [
    "name",
    "email",
    "blocked",
    "updatedAt",
    "createdAt",
  ],
  //metadata
  metadataAllowedSearchFields: ["title", "description"],
  metadataAllowedSorByFields: [
    "title",
    "description",
    "updatedAt",
    "createdAt",
  ],
  //reply
  replyAllowedSearchFields: ["content"],
  replyAllowedSorByFields: ["content", "updatedAt", "createdAt"],
  //comment
  commentAllowedSearchFields: ["content"],
  commentAllowedSorByFields: ["content", "updatedAt", "createdAt"],
  //itemSuggestion
  itemSuggestionAllowedSearchFields: ["user"],
  itemSuggestionAllowedSorByFields: ["user", "updatedAt", "createdAt"],
};

module.exports = Object.freeze(defaults);
