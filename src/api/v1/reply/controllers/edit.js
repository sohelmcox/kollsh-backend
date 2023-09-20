const replyServices = require("../../../../lib/reply");

const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    const reply = await replyServices.edit(id, req.body);
    const { id: replyId } = reply;
    const response = {
      code: 200,
      message: "Reply updated successfully",
      data: reply,
      links: {
        self: `/replies/${replyId}`,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
module.exports = edit;
