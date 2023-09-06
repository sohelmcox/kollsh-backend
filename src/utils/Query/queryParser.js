const defaults = require("../../config/defaults");
// const { badRequest } = require("../error");
const badRequest = (msg = "Bad Request") => {
  const error = {
    name: "Bad Request",
    message: msg,
    error: new Error(msg),
    status: 400,
    details: {},
  };
  return error;
};
// Helper function to parse sort criteria

function parseSortCriteria(
  sort = "updatedAt:desc",
  allowedSorByFields = ["updatedAt"],
) {
  const sortCriteria = {};
  const defaultSortOrder = "desc";

  const sortParts = sort.split(":");

  if (sortParts.length === 2) {
    const [sortBy, sortOrder] = sortParts;
    if (allowedSorByFields.includes(sortBy)) {
      sortCriteria[sortBy] =
        sortOrder.toLowerCase() === defaultSortOrder ? -1 : 1;
    } else {
      throw badRequest(
        `Invalid sort criteria. The accepted Sort are: ${allowedSorByFields.join(
          ", ",
        )}`,
      );
    }
  } else {
    throw badRequest(
      "Invalid sort criteria. The Sort format will be like this: name:asc",
    );
  }
  return sortCriteria;
}

// Helper function to parse selected fields
function parseSelectedFields(fields) {
  return fields ? fields.split(",") : [];
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
  parsePopulatedFields,
  populateAllFields,
};
