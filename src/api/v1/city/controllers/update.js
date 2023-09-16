const cityServices = require("../../../../lib/city");

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, state, priority } = req.body;
  try {
    const { data, code } = await cityServices.updateOrCreate(id, {
      name,
      state,
      priority,
    });
    const { id: cityId } = data;
    const response = {
      code,
      message:
        code === 200
          ? "City updated successfully"
          : "City created successfully",
      data,
      links: {
        self: `/cites/${cityId}`,
      },
    };

    res.status(code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = update;
