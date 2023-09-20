const replyServices = require("../../../../lib/reply");

const findSingle = async (req, res, next) => {
  const { id } = req.params;
  const { populate } = req.query || "";

  try {
    const reply = await replyServices.findSingle({ id, populate });
    const { id: replyId, comment } = reply;
    const response = {
      id: replyId,
      data: reply,
      links: {
        self: `/replies/${replyId}`,
        comment: `/comments/${populate ? comment?.id : comment}`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingle;
