const metadataServices = require("../../../../lib/metadata");

const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    const metadata = await metadataServices.edit(id, req.body);
    const { id: metadataId } = metadata;
    const response = {
      code: 200,
      message: "Metadata updated successfully",
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
module.exports = edit;
