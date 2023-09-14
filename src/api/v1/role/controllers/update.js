const roleService = require("../../../../lib/role");

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, permission } = req.body;
  try {
    const { data, code } = await roleService.updateOrCreate(id, {
      name,
      description,
      permission,
      createdBy: req.user.id,
    });

    const response = {
      code,
      message:
        code === 200
          ? "Role updated successfully"
          : "Role created successfully",
      id: data._id,
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
