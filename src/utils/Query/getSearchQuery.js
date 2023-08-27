const defaults = require("../../config/defaults");

const getSearchQuery = (searchQueryParams) => {
  let searchQuery = {};
  if (Object.keys(searchQueryParams).length > 0) {
    const [[key, value]] = Object.entries(searchQueryParams);
    if (defaults.ItemsAllowedSearchFields.includes(key)) {
      searchQuery = {
        [key]: { $regex: value || "", $options: "i" },
      };
    }
  }
  return searchQuery;
};

module.exports = getSearchQuery;
