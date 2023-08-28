const defaults = {
  totalItems: 0,
  limit: 25,
  page: 1,
  sortOrder: "asc",
  sortBy: "updatedAt",
  search: "",
  radix: 10,
  ItemsAllowedSearchFields: ["name", "description"],
};

module.exports = Object.freeze(defaults);
