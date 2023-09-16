const roleService = require("../../../../lib/role");

const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    const role = await roleService.edit(id, req.body);

    const response = {
      code: 200,
      message: "Role updated successfully",
      data: role,
      links: {
        self: `/roles/${role.id}`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
module.exports = edit;
