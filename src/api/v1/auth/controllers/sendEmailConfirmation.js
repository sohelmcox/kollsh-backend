const authService = require("../../../../lib/auth");

const sendEmailConfirmation = async (req, res, next) => {
  const { email } = req.body;
  try {
    const emailResult = await authService.sendEmailConfirmation(email);
    res
      .status(emailResult.status)
      .json({ message: "Verification email sent successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = sendEmailConfirmation;
