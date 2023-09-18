const getUserDTO = (user) => ({
  id: user.id,
  name: user.name,
  username: user.username,
  email: user.email,
  role: user.role,
  blocked: user.blocked,
  confirmed: user.confirmed,
});

module.exports = getUserDTO;
