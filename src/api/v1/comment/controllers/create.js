const commentServices = require("../../../../lib/comment");
/**
 * Create a new comment.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const create = async (req, res, next) => {
  const { content, item } = req.body;
  try {
    const comment = await commentServices.create({
      content,
      item,
      author: req.user.id,
    });
    const response = {
      code: 201,
      message: "Comment Created Successfully",
      id: comment.id,
      data: comment,
      links: {
        self: `/comments/${comment.id}`,
      },
    };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
