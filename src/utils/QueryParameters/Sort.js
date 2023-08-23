const sortParams = (sort, items) => {
  let sortCriteria = {};
  const [sortBy, sortOrder = "asc"] = sort.split(":");
  sortCriteria[sortBy] = sortOrder.toLowerCase() === "asc" ? 1 : -1;
  // Apply sorting
  if (Object.keys(sortCriteria).length > 0) {
    items = items.sort((a, b) => {
      for (let key in sortCriteria) {
        const sortOrder = sortCriteria[key];
        const valueA = getProperty(a, key);
        const valueB = getProperty(b, key);

        if (valueA < valueB) return -sortOrder;
        if (valueA > valueB) return sortOrder;
      }
      return 0;
    });
  }
  return items;
};
module.exports = sortParams;
