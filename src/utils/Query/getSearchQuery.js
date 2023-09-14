const { badRequest } = require("../error");

const getSearchQuery = (searchQueryParams, allowedSearchFields) => {
  let searchQuery = {};
  if (Object.keys(searchQueryParams).length > 0) {
    const [[key, value]] = Object.entries(searchQueryParams);
    if (allowedSearchFields.includes(key)) {
      searchQuery = {
        [key]: { $regex: value || "", $options: "i" },
      };
    } else {
      throw badRequest(
        `Search query parameter ${key} is not allowed. allowed Fields are ${allowedSearchFields}`,
      );
    }
  }
  return searchQuery;
};

module.exports = getSearchQuery;
