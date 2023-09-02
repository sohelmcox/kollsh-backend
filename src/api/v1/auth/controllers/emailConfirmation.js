const AuthService = require("../../../../lib/auth");

const emailConformation = async (req, res, next) => {
  const { code: confirmationCode } = req.query;
  try {
    const response = await AuthService.emailConformation(confirmationCode);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = emailConformation;
