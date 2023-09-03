const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 4000,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "YOUR_secret_key",
  mongoUri:
    process.env.DB_CONNECTION_URL ||
    `mongodb://${process.env.IP || "localhost"}:${
      process.env.MONGO_PORT || "27017"
    }/kollsh`,
  databaseName: process.env.DB_NAME || "kollsh",
  databaseUsername: process.env.DB_USERNAME || "root",
  databasePassword: process.env.DB_PASSWORD || "",
  databaseUrlQuery: process.env.DB_URL_QUERY || "",
  corsUrl: process.env.CORS_URL || "http://localhost:3000",
  mailUsername: process.env.MAIL_USERNAME || "",
  mailPassword: process.env.MAIL_PASSWORD || "",
  mailgunApiKey: process.env.MAILGUN_API_KEY || "",
  mailDomain: process.env.MAIL_DOMAIN || "",
  appUrl: process.env.APP_URL || "",
  appName: process.env.APP_NAME || "Kollsh",
  appEmailSender: process.env.APP_EMAIL_SENDER || "info@kullesh.com",
  emailVerificationLimit:
    parseInt(process.env.EMAIL_VERIFICATION_LIMIT, 10) || 3,
  passwordResetLimit: parseInt(process.env.PASSWORD_RESET_LIMIT, 10) || 3,
};

module.exports = config;
