const brandServices = require("../../../../lib/brand");

const findSingle = async (req, res, next) => {
  const { id } = req.params;
  const { populate } = req.query || "";

  try {
    const brand = await brandServices.findSingle({ id, populate });
    const { id: brandId } = brand;
    const response = {
      id: brandId,
      data: brand,
      links: {
        self: `/brands/${brandId}`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingle;
