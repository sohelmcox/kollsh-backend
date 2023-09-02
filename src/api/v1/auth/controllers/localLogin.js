const authService = require("../../../../lib/auth");

const localLogin = async (req, res, next) => {
  const { identifier, password } = req.body;

  try {
    const userData = await authService.localLogin(identifier, password);
    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};

module.exports = localLogin;
