const authService = require("../../../../lib/auth");

const emailConfirmationAttempts = async (req, res, next) => {
  const { email } = req.query;
  try {
    const response = await authService.emailConfirmationAttempts(email);
    res.status(200).json({ status: 200, emailConfirmationAttempts: response });
  } catch (error) {
    next(error);
  }
};

module.exports = emailConfirmationAttempts;
