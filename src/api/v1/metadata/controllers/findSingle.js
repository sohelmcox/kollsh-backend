const metadataServices = require("../../../../lib/metadata");

const findSingle = async (req, res, next) => {
  const { id } = req.params;

  try {
    const metadata = await metadataServices.findSingle(id);
    const { id: metadataId } = metadata;
    const response = {
      id: metadataId,
      data: metadata,
      links: {
        self: `/metadata/${metadataId}`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingle;
