const authServices = require("../../../../lib/auth");

const resetPasswordAttempts = async (req, res, next) => {
  try {
    const { email } = req.query;
    const response = await authServices.resetPasswordAttempts({ email });
    res.status(200).json({ status: 200, resetPasswordAttempts: response });
  } catch (error) {
    next(error);
  }
};
module.exports = resetPasswordAttempts;
