const {
  parseSortCriteria,
  parseSelectedFields,
  parsePopulatedFields,
} = require("../../utils/Query/queryParser");
const config = require("../../config/defaults");
const { State } = require("../../models");
const { selectFields } = require("../../utils/Query/selectField");
const { getPagination } = require("../../utils/Query/getPagination");
const getHATEOASForAllItems = require("../../utils/Query/getHATEOASForAllItems");
const defaults = require("../../config/defaults");
const getSearchQuery = require("../../utils/Query/getSearchQuery");
const { getPopulatedFields } = require("../../utils/Query/getPopulatedFields");
const removeUndefinedQuery = require("../../utils/Query/removeUndefinedQuery");
const { removeAllListeners } = require("../../models/Country");

/**
 * Find all State based on provided query parameters.
 *
 * @param {Object} params - The parameters for the query.
 * @param {string} params.sort - Sorting criteria for the query.
 * @param {string[]} params.fields - Selected fields to include in the results.
 * @param {string[]} params.populate - Fields to populate in the results.
 * @param {Object} params.search - Search criteria for filtering results.
 * @param {string} params.locale - Locale information for localization.
 * @param {number} params.pageNumber - Page number for pagination.
 * @param {number} params.pageSize - Number of State per page for pagination.
 * @param {number} params.pageStart - Starting index for pagination.
 * @param {string} params.url - URL information.
 * @param {string} params.path - Path information.
 * @param {Object} params.requestQuery - Query parameters from the request.
 * @returns {Object} - The result containing States, metadata, and filters.
 */
const findAll = async ({
  sort,
  fields,
  populate,
  search,
  locale,
  pageNumber = 1,
  pageSize = defaults.pageSize,
  pageStart,
  url,
  path,
  requestQuery,
}) => {
  // Parse query parameters
  const query = {
    sortCriteria: parseSortCriteria(sort, config.stateAllowedSorByFields),
    selectedFields: parseSelectedFields(fields),
    populatedFields: parsePopulatedFields(populate),
    searchQuery: search,
    locale,
    pageNumber: parseInt(pageNumber, defaults.radix) || 1,
    limit: parseInt(pageSize, defaults.radix) || config.pageSize,
    skip: parseInt(pageStart, defaults.radix) || 0,
    totalEntities: parseInt(pageSize, defaults.radix) || config.pageSize,
  };
  // handling search query
  let searchQuery = {};
  if (query.searchQuery) {
    searchQuery = getSearchQuery(
      query.searchQuery,
      defaults.stateAllowedSearchFields,
    );
  }
  const sortStr = query.sortCriteria;
  // Fetch states from the database
  let states = await State.find(searchQuery)
    .sort(sortStr)
    .skip(pageNumber * pageSize - pageSize)
    .limit(pageSize)
    .exec();

  // Apply population
  const { populatedFields } = query;
  if (populatedFields.length > 0) {
    states = await getPopulatedFields(populatedFields, states);
  }

  // Select fields
  if (query.selectedFields.length > 0) {
    states = selectFields(states, query.selectedFields);
  }
  // skip pageStart
  if (query.skip > 0) {
    states = states.slice(query.skip);
  }
  // limit totalEntities
  const totalCount = await State.count(searchQuery);
  const pagination = getPagination({
    totalCount,
    pageSize,
    pageNumber,
  });

  // remove undefined queries
  const finalQuery = removeUndefinedQuery(requestQuery);
  const links = getHATEOASForAllItems({
    url,
    path,
    requestQuery: finalQuery,
    hasNext: !!pagination.next,
    hasPrev: !!pagination.prev,
    pageNumber,
  });

  const paginationResponse = {
    page: query.pageNumber,
    limit: query.limit,
    skip: query.skip,
    totalEntities: removeAllListeners.length,
    totalCount,
  };
  const filters = {
    locale: query.locale,
    sortCriteria: query.sortCriteria,
    selectedFields: query.selectedFields,
    populatedFields: query.populatedFields,
    searchQuery: query.searchQuery,
  };
  let finalItems = [];
  if (query.selectedFields.length > 0) {
    finalItems = states.map((state) => ({
      id: state.id,
      data: { ...state },
    }));
  } else {
    finalItems = states.map((state) => ({
      id: state.id,
      data: { ...state._doc },
    }));
  }

  // Generate the full response
  const data = {
    data: finalItems,
    meta: {
      pagination: paginationResponse,
      links,
      filters,
    },
  };

  return data;
};

module.exports = findAll;
