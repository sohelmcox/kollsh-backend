const jwt = require("jsonwebtoken");
const { error } = require("../../utils");
const config = require("../../config");

const generateToken = ({
  payload,
  algorithm = "HS256",
  secret = config.accessTokenSecret,
  expiresIn = "1h",
}) => {
  try {
    return jwt.sign(payload, secret, {
      algorithm,
      expiresIn,
    });
  } catch (e) {
    throw error.serverError();
  }
};

const decodeToken = ({ token, algorithm = "HS256" }) => {
  try {
    return jwt.decode(token, { algorithms: [algorithm] });
  } catch (e) {
    throw error.serverError();
  }
};

const verifyToken = ({
  token,
  algorithm = "HS256",
  secret = config.accessTokenSecret,
}) => {
  try {
    return jwt.verify(token, secret, { algorithms: [algorithm] });
  } catch (e) {
    throw error.serverError();
  }
};

module.exports = {
  generateToken,
  decodeToken,
  verifyToken,
};
