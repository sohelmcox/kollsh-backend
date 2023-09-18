const metadataServices = require("../../../../lib/metadata");
/**
 * Create a new Metadata.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const create = async (req, res, next) => {
  const { title, description, image, keywords } = req.body;
  try {
    const metadata = await metadataServices.create({
      title,
      description,
      image,
      keywords,
    });
    const { id: metadataId } = metadata;
    const response = {
      code: 201,
      message: "Metadata Created Successfully",
      data: metadata,
      links: {
        self: `/metadata/${metadataId}`,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
