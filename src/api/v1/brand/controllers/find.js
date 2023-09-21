const brandServices = require("../../../../lib/brand");

const find = async (req, res, next) => {
  try {
    // Retrieve query parameters
    const {
      sort,
      fields,
      populate,
      locale,
      pageNumber,
      pageSize,
      pageStart,
      search,
    } = req.query;
    // Parse query parameters
    const hello = {
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
    };
    console.log("hello", hello);
    const data = await brandServices.findAll({
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
module.exports = find;
