const authServices = require("../../../../lib/auth");

const resetPassword = async (req, res, next) => {
  try {
    const {
      email,
      code: resetPasswordCode,
      password: newPassword,
      passwordConfirmation,
    } = req.body;
    const response = await authServices.resetPassword({
      email,
      resetPasswordCode,
      newPassword,
      passwordConfirmation,
    });

    // res.json({ message: "Password reset successful." });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = resetPassword;
