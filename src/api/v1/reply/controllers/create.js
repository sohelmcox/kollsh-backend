const replyServices = require("../../../../lib/reply");
/**
 * Create a new Reply.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const create = async (req, res, next) => {
  const { content, comment } = req.body;
  try {
    const reply = await replyServices.create({
      content,
      comment,
      user: req.user.id,
    });
    const { id: replyId } = reply;
    const response = {
      code: 201,
      message: "Reply Created Successfully",
      data: reply,
      links: {
        self: `/replies/${replyId}`,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
