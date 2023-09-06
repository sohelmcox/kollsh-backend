const {
  parseSortCriteria,
  parseSelectedFields,
  parsePopulatedFields,
} = require("../../utils/Query/queryParser");
const config = require("../../config/defaults");
const { Item, User } = require("../../models");
const { selectFields } = require("../../utils/Query/selectField");
const { getPagination } = require("../../utils/Query/getPagination");
const {
  getHATEOASForAllItems,
} = require("../../utils/Query/getHATEOASForAllItems");
const defaults = require("../../config/defaults");
const getSearchQuery = require("../../utils/Query/getSearchQuery");
const {
  getPopulatedFields,
  getSinglePopulatedFields,
} = require("../../utils/Query/getPopulatedFields");
const { notFound } = require("../../utils/error");
const { generateUniqueSlug } = require("../../utils/generateUniqueSlug");
const getUserDTO = require("../../utils/getUserDTO");
const removeUndefinedQuery = require("../../utils/Query/removeUndefinedQuery");

/**
 * Find all items based on provided query parameters.
 *
 * @param {Object} params - The parameters for the query.
 * @param {string} params.sort - Sorting criteria for the query.
 * @param {string[]} params.fields - Selected fields to include in the results.
 * @param {string[]} params.populate - Fields to populate in the results.
 * @param {Object} params.search - Search criteria for filtering results.
 * @param {string} params.locale - Locale information for localization.
 * @param {number} params.pageNumber - Page number for pagination.
 * @param {number} params.pageSize - Number of items per page for pagination.
 * @param {number} params.pageStart - Starting index for pagination.
 * @param {string} params.url - URL information.
 * @param {string} params.path - Path information.
 * @param {Object} params.requestQuery - Query parameters from the request.
 * @returns {Object} - The result containing items, metadata, and filters.
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
  const query = {
    sortCriteria: parseSortCriteria(sort),
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
    searchQuery = getSearchQuery(query.searchQuery);
  }
  const sortStr = query.sortCriteria;
  // Fetch items from the database
  let items = await Item.find(searchQuery)
    .sort(sortStr)
    .skip(pageNumber * pageSize - pageSize)
    .limit(pageSize)
    .exec();

  // Apply population
  const { populatedFields } = query;
  if (populatedFields.length > 0) {
    items = await getPopulatedFields(populatedFields, items);
  }

  // Select fields
  if (query.selectedFields.length > 0) {
    items = selectFields(items, query.selectedFields);
  }
  // skip pageStart
  if (query.skip > 0) {
    items = items.slice(query.skip);
  }
  // limit totalEntities
  const totalCount = await Item.count(searchQuery);
  const pagination = getPagination({
    totalCount,
    pageSize,
    pageNumber,
  });
  console.log("requestQuery", requestQuery);
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
    totalEntities: items.length,
    totalCount,
  };
  const filters = {
    locale: query.locale,
    sortCriteria: query.sortCriteria,
    selectedFields: query.selectedFields,
    populatedFields: query.populatedFields,
    searchQuery: query.searchQuery,
  };
  // const finalItems = items.map((item) => ({
  //   id: item.id,
  //   data: { ...item },
  // }));
  //
  //
  // Generate the full response
  const data = {
    data: items,
    meta: {
      pagination: paginationResponse,
      links,
      filters,
    },
  };

  return data;
};

/**
 * Create a new item.
 *
 * @param {Object} itemData - Data to create a new item.
 * @returns {Promise} - Resolves to the created item.
 */
const create = async ({
  name,
  description,
  released,
  thumbnail,
  subcategory,
  state,
  cities,
  price,
  negotiable,
  is_argent,
  brand,
  seller,
  createdBy,
  updatedBy,
}) => {
  // Generate a unique slug
  const uniqueSlug = await generateUniqueSlug(Item, name);
  const itemData = {
    name,
    slug: uniqueSlug,
    description,
    released,
    thumbnail,
    subcategory,
    state,
    cities,
    price,
    negotiable,
    is_argent,
    brand,
    seller,
    createdBy,
    updatedBy,
  };
  const newItem = new Item(itemData);

  // Validate data using Mongoose schema validation
  const validationError = newItem.validateSync();
  if (validationError) {
    throw new Error(validationError.message);
  }

  // Save the new item to the database
  await newItem.save();

  return { ...newItem._doc, id: newItem.id };
};

/**
 * Find a single item based on provided ID and populate fields if specified.
 *
 * @param {Object} params - The parameters for the query.
 * @param {string} params.id - The ID of the item to find.
 * @param {string[]} params.populate - Fields to populate in the result.
 * @returns {Object} - The item data with populated fields if requested.
 */
const findSingle = async ({ id, populate }) => {
  const populatedFields = parsePopulatedFields(populate);
  let item = await Item.findById(id).exec();
  if (!item) {
    throw notFound();
  }

  // Apply population
  if (populatedFields.length > 0) {
    item = await getSinglePopulatedFields(item, populatedFields);
    // item = await item.populate(populatedFields.join(" "));
  }
  return { ...item._doc, id: item.id };
};
/**
 * Update or create an item based on provided data.
 *
 * @param {string} id - The ID of the item to update or create.
 * @param {Object} data - The data object containing item properties.
 * @returns {Promise} - Resolves to the updated or created item.
 */

const updateOrCreate = async (
  id,
  {
    name,
    description,
    released = Date.now(),
    thumbnail,
    slug,
    subcategory,
    state,
    cities,
    price,
    negotiable = false,
    is_argent = false,
    brand = null,
    seller,
  },
) => {
  const item = await Item.findById(id);

  if (!item) {
    const newItem = await create({
      name,
      description,
      released,
      thumbnail,
      slug,
      subcategory,
      state,
      cities,
      price,
      negotiable,
      is_argent,
      brand,
      seller,
    });
    return {
      newItem,
      code: 201,
    };
  }

  const payload = {
    name,
    description,
    released,
    thumbnail,
    slug,
    subcategory,
    state,
    cities,
    price,
    negotiable,
    is_argent,
    brand,
    seller,
  };

  item.overwrite(payload);
  await item.save();

  return { item: { ...item._doc, id: item.id }, code: 200 };
};

const edit = async (
  id,
  {
    name,
    description,
    released,
    thumbnail,
    slug,
    subcategory,
    state,
    cities,
    price,
    negotiable,
    is_argent,
    brand,
    seller,
  },
) => {
  const item = await Item.findById(id);
  if (!item) {
    throw notFound();
  }

  const payload = {
    name,
    description,
    released,
    thumbnail,
    slug,
    subcategory,
    state,
    cities,
    price,
    negotiable,
    is_argent,
    brand,
    seller,
  };

  Object.keys(payload).forEach((key) => {
    item[key] = payload[key] ?? item[key];
  });

  await item.save();
  return { ...item._doc, id: item.id };
};

const destroy = async (id) => {
  const item = await Item.findById(id);
  if (!item) {
    throw notFound();
  }
  // TODO:
  // Asynchronously delete all item details

  await item.deleteOne();
};

const findSeller = async (itemId) => {
  const item = await Item.findById(itemId).exec();
  if (!item) {
    throw notFound();
  }
  const seller = await User.findById(item?._doc?.seller).exec();
  const data = getUserDTO(seller._doc);
  return {
    id: seller.id,
    data: { ...data },
  };
};

const deleteMany = async (itemIds) => {
  try {
    const result = await Item.deleteMany({ _id: { $in: itemIds } });
    return result.deletedCount; // Return the number of deleted items
  } catch (error) {
    throw new Error(`Error deleting items: ${error.message}`);
  }
};

module.exports = {
  findAll,
  findSingle,
  create,
  updateOrCreate,
  edit,
  destroy,
  findSeller,
  deleteMany,
};
