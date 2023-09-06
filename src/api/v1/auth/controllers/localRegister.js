const authService = require("../../../../lib/auth");

const localRegister = async (req, res, next) => {
  const { name, username, email, password } = req.body;

  try {
    const emailResult = await authService.localRegister({
      name,
      username,
      email,
      password,
    });
    res.status(emailResult.status).json({
      status: emailResult.status,
      message:
        "Registration successful. Please check your email for verification link",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = localRegister;
