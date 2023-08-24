const defaults = require("../../config/defaults");

const getPagination = ({
  totalEntities = defaults.totalItems,
  pageLimit = defaults.limit,
  pageNumber = defaults.page,
}) => {
  const totalPage = Math.ceil(totalEntities / pageLimit);

  const pagination = {
    pageNumber,
    pageLimit,
    totalEntities,
    totalPage,
  };

  if (pageNumber < totalPage) {
    pagination.next = pageNumber + 1;
  }

  if (pageNumber > 1) {
    pagination.prev = pageNumber - 1;
  }

  return pagination;
};
module.exports = { getPagination };
