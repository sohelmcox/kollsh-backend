const commentService = require("../../../../lib/comment");

const findSingle = async (req, res, next) => {
  const { id } = req.params;
  const { populate } = req.query || "";

  try {
    const comment = await commentService.findSingle({ id, populate });
    const { id: commentId } = comment;
    const response = {
      id: commentId,
      data: comment,
      links: {
        self: `/comments/${commentId}`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingle;
