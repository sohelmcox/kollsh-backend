const {
  parseSortCriteria,
  parseSelectedFields,
  parseAppliedFilters,
  parsePopulatedFields,
  populateAllFields,
} = require("../../utils/Query/queryParser");
const config = require("../../config/defaults");
const { Item } = require("../../models");
const { sorting } = require("../../utils/Query/sorting");
const { selectFields } = require("../../utils/Query/selectField");
const { applyFilters } = require("../../utils/Query/filter");
const { getPagination } = require("../../utils/Query/getPagination");
const {
  getHATEOASForAllItems,
} = require("../../utils/Query/getHATEOASForAllItems");

const findAllItems = async ({
  sort,
  fields,
  populate,
  filters = {},
  locale,
  pageNumber,
  pageSize,
  pageStart,
  pageLimit,
  search,
  url,
  path,
  requestQuery,
}) => {
  const query = {
    sortCriteria: parseSortCriteria(sort),
    selectedFields: parseSelectedFields(fields),
    appliedFilters: parseAppliedFilters(filters),
    populatedFields: parsePopulatedFields(populate),
    locale,
    page: parseInt(pageNumber, 10) || 1,
    limit: parseInt(pageSize, 10) || config.limit,
    skip:
      parseInt(pageStart, 10) ||
      (parseInt(pageNumber, 10) - 1) * parseInt(pageSize, 10) ||
      0,
    totalEntities: parseInt(pageLimit, 10) || config.limit,
  };

  const filter = {
    name: { $regex: search || "", $options: "i" },
  };
  // const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  const sortStr = query.sortCriteria;
  // Fetch items from the database
  let items = await Item.find(filter)
    .sort(sortStr)
    .skip(pageNumber * pageLimit - pageLimit)
    .limit(pageLimit)
    .exec();

  // Apply sorting
  // if (Object.keys(query.sortCriteria).length > 0) {
  //   items = sorting(items, query.sortCriteria);
  // }

  // Apply population
  if (query.populatedFields.length > 0) {
    const { populatedFields } = query;
    if (populatedFields.includes("*")) {
      items = await Item.find().populate(populateAllFields(Item.schema)).exec();
    } else {
      items = await Item.find().populate(populatedFields.join(" ")).exec();
    }
  }
  // Select fields
  if (query.selectedFields.length > 0) {
    items = selectFields(items, query.selectedFields);
  }
  // Apply filters
  if (filters) {
    if (Object.keys(query.appliedFilters).length > 0) {
      items = applyFilters(items, query.appliedFilters);
    }
  }
  // Paginate results
  const totalCount = await Item.count(filter);
  // const paginatedItems = items.slice(
  //   query.skip,
  //   query.skip + query.totalEntities,
  // );
  const pagination = getPagination({
    totalCount,
    pageLimit,
    pageNumber,
  });

  const links = getHATEOASForAllItems({
    url,
    path,
    requestQuery,
    hasNext: !!pagination.next,
    hasPrev: !!pagination.prev,
    pageNumber,
  });
  console.log("links", !!pagination.next, !!pagination.prev);
  const paginationResponse = {
    page: query.page,
    limit: query.limit,
    offset: query.skip,
    totalEntities: query.totalEntities,
    totalCount,
  };
  // Generate the full response
  const response = {
    locale: query.locale,
    sortCriteria: query.sortCriteria,
    selectedFields: query.selectedFields,
    populatedFields: query.populatedFields,
    appliedFilters: query.appliedFilters,
    pagination: paginationResponse,
    items,
    links,
  };

  return response;
};
module.exports = { findAllItems };
