const removeUndefinedQuery = (query) => {
  for (const key in query) {
    if (query[key] === undefined) {
      delete query[key];
    }
  }
  return query;
};

module.exports = removeUndefinedQuery;
