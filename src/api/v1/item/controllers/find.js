const articleService = require("../../../../lib/article");

const find = async (req, res, next) => {
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
      search,
    } = req.query;
    // Parse query parameters
    const response = await articleService.findAllItems({
      sort,
      fields,
      populate,
      filters,
      locale,
      pageNumber,
      pageSize,
      pageStart,
      pageLimit,
      search,
      url: req.url,
      path: req.path,
      requestQuery: req.query,
    });

    // Send response
    res.status(200).json({ response });
  } catch (error) {
    next(error);
  }
};
module.exports = find;
