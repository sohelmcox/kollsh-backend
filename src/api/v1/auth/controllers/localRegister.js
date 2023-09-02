const authService = require("../../../../lib/auth");

const localRegister = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const emailResult = await authService.localRegister({
      username,
      email,
      password,
    });
    res
      .status(emailResult.status)
      .json({
        message:
          "Registration successful. Please check your email for verification link",
      });
  } catch (error) {
    next(error);
  }
};

module.exports = localRegister;
