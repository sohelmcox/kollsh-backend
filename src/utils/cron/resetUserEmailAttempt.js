const { CronJob } = require("cron");
const { User } = require("../../models");

const cronExpression = "0 0 * * *"; // Runs at midnight every day

const startEmailAttemptCronJob = () => {
  const job = new CronJob(cronExpression, async () => {
    try {
      // Update emailVerificationAttempts for users who meet your criteria
      const resetTime = Date.now() - 24 * 60 * 60 * 1000; // 24 hours ago

      // Use Mongoose to update the User model
      await User.updateMany(
        {
          emailVerificationAttempts: { $gt: 0 },
          updatedAt: { $lt: resetTime },
        },
        { emailVerificationAttempts: 0 },
      );

      console.log("Email verification attempts reset successfully.");
    } catch (error) {
      console.error("Cron job error:", error);
    }
  });

  // Start the cron job
  job.start();

  // No need to attach event listeners using job.on in this case
};
module.exports = startEmailAttemptCronJob;
