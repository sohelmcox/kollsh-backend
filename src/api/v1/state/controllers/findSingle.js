const stateServices = require("../../../../lib/state");

const findSingle = async (req, res, next) => {
  const { id } = req.params;
  const { populate } = req.query || "";

  try {
    const state = await stateServices.findSingle({ id, populate });
    const { id: stateId } = state;
    const response = {
      id: stateId,
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

module.exports = findSingle;
