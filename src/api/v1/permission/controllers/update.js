const permissionServices = require("../../../../lib/permission");

const update = async (req, res, next) => {
  const { id } = req.params;
  const { controller, description, actions } = req.body;
  try {
    const { data, code } = await permissionServices.updateOrCreate(id, {
      controller,
      description,
      actions,
      createdBy: req.user.id,
    });

    const response = {
      code,
      message:
        code === 200
          ? "Permission updated successfully"
          : "Permission created successfully",
      data,
      links: {
        self: `/items/${data.id}`,
      },
    };

    res.status(code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = update;
