const getUserDTO = (user) => ({
  name: user.name,
  username: user.username,
  email: user.email,
  role: user.role,
  blocked: user.blocked,
  confirmed: user.confirmed,
});

module.exports = getUserDTO;
