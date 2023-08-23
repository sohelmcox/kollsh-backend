const { State } = require("../../../../models");
const {
  parseSortCriteria,
  parseSelectedFields,
  parsePopulatedRelations,
  parseAppliedFilters,
  sorting,
  selectFields,
  populateRelations,
  applyFilters,
} = require("../../../../utils/QueryParameters/queryHelpers");

const find = async (req, res) => {
  try {
    // Retrieve query parameters
    const {
      sort,
      fields,
      populate,
      filters,
      locale,
      pageNumber,
      pageSize,
      pageStart,
      pageLimit,
    } = req.query;
    // Parse query parameters
    const query = {
      sortCriteria: parseSortCriteria(sort),
      selectedFields: parseSelectedFields(fields),
      populatedRelations: parsePopulatedRelations(populate),
      appliedFilters: parseAppliedFilters(filters),
      locale,
      page: parseInt(pageNumber) || 1,
      limit: parseInt(pageSize) || 25,
      skip:
        parseInt(pageStart) ||
        (parseInt(pageNumber) - 1) * parseInt(pageSize) ||
        0,
      entitiesToReturn: parseInt(pageLimit) || 25,
    };

    // Fetch states from the database
    let states = await State.find().exec();

    // Apply sorting
    if (Object.keys(query.sortCriteria).length > 0) {
      states = sorting(states, query.sortCriteria);
    }

    // Select fields
    if (query.selectedFields.length > 0) {
      states = selectFields(states, query.selectedFields);
    }

    // Apply population
    if (query.populatedRelations.length > 0) {
      states = await populateRelations(
        states,
        query.populatedRelations,
        populate === "*"
      );
    }

    // Apply filters
    if (filters) {
      if (Object.keys(query.appliedFilters).length > 0) {
        states = applyFilters(states, query.appliedFilters);
      }
    }
    // Paginate results
    const totalCount = states.length;
    const paginatedState = states.slice(
      query.skip,
      query.skip + query.entitiesToReturn
    );

    // Generate the full response
    const response = {
      locale: query.locale,
      sortCriteria: query.sortCriteria,
      selectedFields: query.selectedFields,
      populatedRelations: query.populatedRelations,
      appliedFilters: query.appliedFilters,
      page: query.page,
      limit: query.limit,
      offset: query.skip,
      entitiesToReturn: query.entitiesToReturn,
      totalCount,
      states: paginatedState,
    };

    // Send response
    res.status(200).json(response);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = find;
