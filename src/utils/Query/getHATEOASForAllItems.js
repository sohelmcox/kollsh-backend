const generateQueryString = (query) =>
  Object.keys(query)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`,
    )
    .join("&");

const getHATEOASForAllItems = ({
  url = "/",
  path = "",
  requestQuery = {},
  hasNext = false,
  hasPrev = false,
  pageNumber = 1,
}) => {
  const links = {
    self: url,
  };

  if (hasNext) {
    const queryStr = generateQueryString({
      ...requestQuery,
      pageNumber: pageNumber + 1,
    });
    links.next = `${path}?${queryStr}`;
  }
  if (hasPrev) {
    const queryStr = generateQueryString({
      ...requestQuery,
      pageNumber: pageNumber - 1,
    });
    links.prev = `${path}?${queryStr}`;
  }

  return links;
};
module.exports = { getHATEOASForAllItems, generateQueryString };
