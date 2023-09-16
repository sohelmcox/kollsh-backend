const stateServices = require("../../../../lib/state");

const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    const state = await stateServices.edit(id, req.body);
    const { id: stateId } = state;
    const response = {
      code: 200,
      message: "State updated successfully",
      data: state,
      links: {
        self: `/states/${stateId}`,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
module.exports = edit;
