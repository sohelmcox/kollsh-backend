const commentService = require("../../../../lib/comment");

const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    const comment = await commentService.edit(id, req.body);

    const response = {
      code: 200,
      message: "Comment updated successfully",
      data: comment,
      links: {
        self: `/comments/${comment.id}`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
module.exports = edit;
