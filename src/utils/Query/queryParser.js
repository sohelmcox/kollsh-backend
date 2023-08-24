// Helper function to parse sort criteria
function parseSortCriteria(sort) {
  // eslint-disable-next-line prefer-const
  let sortCriteria = {};
  if (sort) {
    const [sortBy, sortOrder = "asc"] = sort.split(":");
    sortCriteria[sortBy] = sortOrder.toLowerCase() === "asc" ? 1 : -1;
  }
  return sortCriteria;
}
// Helper function to parse selected fields
function parseSelectedFields(fields) {
  return fields ? fields.split(",") : [];
}

// Helper function to parse applied filters
function parseAppliedFilters(filters) {
  return filters;
}

// Helper function to parse populated fields from query
function parsePopulatedFields(query) {
  if (Array.isArray(query)) {
    return query;
  }
  if (query) {
    return query.split(",");
  }
  return [];
}
// Helper function to populate all available fields
function populateAllFields(schema) {
  // Get all available fields from the schema
  const relations = Object.keys(schema.paths).filter((path) => path !== "_id");
  return relations.join(" ");
}
module.exports = {
  parseSortCriteria,
  parseSelectedFields,
  parseAppliedFilters,
  parsePopulatedFields,
  populateAllFields,
};
