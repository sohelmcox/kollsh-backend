const commentService = require("../../../../lib/comment");

const update = async (req, res, next) => {
  const { id } = req.params;
  const { content, itemDetails } = req.body;
  try {
    const { data, code } = await commentService.updateOrCreate(id, {
      content,
      itemDetails,
    });

    const response = {
      code,
      message:
        code === 200
          ? "Comment updated successfully"
          : "Comment created successfully",
      data,
      links: {
        self: `/comments/${data.id}`,
      },
    };

    res.status(code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = update;
