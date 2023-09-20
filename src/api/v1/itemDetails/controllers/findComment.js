const itemDetailsService = require("../../../../lib/itemDetails");

const findComment = async (req, res, next) => {
  try {
    // Retrieve query parameters
    const {
      itemId,
      sort,
      fields,
      populate,
      locale,
      pageNumber,
      pageSize,
      pageStart,
      search,
    } = req.query;
    // Parse query parameter
    const data = await itemDetailsService.findComments({
      itemId,
      sort,
      fields,
      populate,
      locale,
      pageNumber,
      pageSize,
      pageStart,
      search,
      url: req.url,
      path: req.path,
      requestQuery: req.query,
    });
    // Send response
    res.status(200).json({ ...data });
  } catch (error) {
    next(error);
  }
};
module.exports = findComment;
