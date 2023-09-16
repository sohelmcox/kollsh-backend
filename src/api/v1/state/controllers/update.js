const stateServices = require("../../../../lib/state");

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, image, cities, country, priority } = req.body;
  try {
    const { data, code } = await stateServices.updateOrCreate(id, {
      name,
      image,
      cities,
      country,
      priority,
    });
    const { id: stateId } = data;
    const response = {
      code,
      message:
        code === 200
          ? "State updated successfully"
          : "State created successfully",
      data,
      links: {
        self: `/states/${stateId}`,
      },
    };

    res.status(code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = update;
