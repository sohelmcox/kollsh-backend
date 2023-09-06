const authService = require("../../../../lib/auth");

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const message = await authService.forgotPassword(email);
    res
      .status(message.status)
      .json({
        status: message.status,
        message: "Verification email sent successfully",
      });
  } catch (error) {
    next(error);
  }
};
module.exports = forgotPassword;
