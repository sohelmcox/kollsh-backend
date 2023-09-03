const getUserDTO = (user) => ({
  username: user.username,
  email: user.email,
  role: user.role,
  blocked: user.blocked,
  confirmed: user.confirmed,
});

module.exports = getUserDTO;
