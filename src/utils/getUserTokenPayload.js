const getUserTokenPayload = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  role: user.role,
  blocked: user.blocked,
});

module.exports = getUserTokenPayload;
