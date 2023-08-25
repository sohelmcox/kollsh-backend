const defaults = require("../../config/defaults");

const getPagination = ({
  totalCount = defaults.totalItems,
  pageLimit = defaults.limit,
  pageNumber = defaults.page,
}) => {
  const totalPage = Math.ceil(totalCount / pageLimit);

  const pagination = {
    pageNumber,
    pageLimit,
    totalCount,
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
