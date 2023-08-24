/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
const { getProperty } = require("./getProperty");

const applyFilters = (items, appliedFilters) =>
  items.filter((item) =>
    Object.keys(appliedFilters).every((key) => {
      const filterValue = appliedFilters[key];
      const itemValue = getProperty(item, key);
      return String(itemValue) === filterValue;
    }),
  );

module.exports = { applyFilters };
