const jwt = require("jsonwebtoken");
const moment = require("moment");
const config = require("../config");
const Token = require("../models/token.model");
const ApiError = require("../helper/apiError");
const httpStatus = require("../util/httpStatus");

const generateToken = (userId, expires, secret) => {
  const payload = {
    _id: userId,
    iat: moment().unix(),
    exp: expires.unix(),
  };
  return jwt.sign(payload, secret);
};    

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  return Token.create({ token, user: userId, expires: expires.toDate(), type, blacklisted });
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(   
    Number(config.jwt.accessExpirationMinutes),
    "minutes"
  );

  const accessToken = generateToken(
    user._id,
    accessTokenExpires,
    config.jwt.accessSecret
  );

  const refreshTokenExpires = moment().add(
    Number(config.jwt.refreshExpirationDays),
    "days"
  );

  const refreshToken = generateToken(
    user._id,
    refreshTokenExpires,
    config.jwt.refreshSecret
  );

  // store refresh token
  await saveToken(refreshToken, user._id, refreshTokenExpires, "refresh");

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

const generateVerificationToken = async (userId) => {
  const verificationTokenExpires = moment().add(
    Number(config.jwt.verificationExpirationMinutes),
    "minutes"
  );
  const verificationToken = generateToken(
    userId,
    verificationTokenExpires,
    config.jwt.verificationSecret
  );

  await saveToken(verificationToken, userId, verificationTokenExpires, "verify");

  return verificationToken;
};

const verifyToken = async (token, type) => {
  try {
    if (type === "accessToken") {
      return jwt.verify(token, config.jwt.accessSecret);
    }

    if (type === "refreshToken") {
      // ensure token exists in DB and is not blacklisted
      const saved = await Token.findOne({ token, type: "refresh", blacklisted: false });
      if (!saved) {
        throw new ApiError(httpStatus.unauthorized, "Refresh token not found or revoked");
      }
      return jwt.verify(token, config.jwt.refreshSecret);
    }

    if (type === "verify") {
      const saved = await Token.findOne({ token, type: "verify", blacklisted: false });
      if (!saved) {
        throw new ApiError(httpStatus.unauthorized, "Verification token not found or revoked");
      }
      return jwt.verify(token, config.jwt.verificationSecret);
    }
    throw new ApiError(httpStatus.badRequest, "Invalid token type");
  } catch (err) {
    throw err;
  }
};

const revokeRefreshToken = async (token) => {
  return Token.findOneAndUpdate({ token, type: "refresh" }, { blacklisted: true });
};

const refreshAuth = async (refreshToken) => {
  // verify token and get payload
  const payload = await verifyToken(refreshToken, "refreshToken");

  const userId = payload._id;
  // rotate: blacklist current refresh token and issue new pair
  await revokeRefreshToken(refreshToken);

  // create new tokens
  const tokens = await generateAuthTokens({ _id: userId });
  return tokens;
};

module.exports = {
  generateAuthTokens,
  generateVerificationToken,
  verifyToken,
  saveToken,
  revokeRefreshToken,
  refreshAuth,
};
