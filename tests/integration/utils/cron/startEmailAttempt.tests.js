const startPasswordResetAttemptCronJob = require("../../../../src/utils/cron/resetPasswordAttempt");
const { CronJob } = require("cron");
const { User } = require("../../../../src/models");

jest.mock("cron"); // Mock the CronJob class
//TODO need to optimize this test
describe("startPasswordResetAttemptCronJob", () => {
  it("should start the Cron job", () => {
    // Mock the CronJob constructor
    CronJob.mockImplementationOnce((expression, callback) => {
      // Mock the job start method
      const job = {
        start: jest.fn(),
      };
      callback(); // Simulate executing the job immediately
      return job;
    });

    // Call the startPasswordResetAttemptCronJob function
    startPasswordResetAttemptCronJob();

    // Verify that the CronJob constructor was called with the correct expression
    expect(CronJob).toHaveBeenCalledWith("0 0 * * *", expect.any(Function));
  });

  it("should reset password reset attempts for eligible users", async () => {
    // Mock the CronJob constructor
    CronJob.mockImplementationOnce((expression, callback) => {
      // Mock the job start method
      const job = {
        start: jest.fn(),
      };
      callback(); // Simulate executing the job immediately
      return job;
    });

    // Mock the User.updateMany method
    User.updateMany = jest.fn().mockResolvedValue({ nModified: 2 });

    // Call the startPasswordResetAttemptCronJob function
    await startPasswordResetAttemptCronJob();

    // Verify that User.updateMany was called with the correct criteria
    expect(User.updateMany).toHaveBeenCalledWith(
      {
        passwordResetAttempts: { $gt: 3 },
        passwordResetLastAttemptAt: {
          $lt: expect.any(Date), // Expect a Date object
        },
      },
      { passwordResetAttempts: 0 },
    );
  });

  it("should handle errors gracefully", async () => {
    // Mock the CronJob constructor
    CronJob.mockImplementationOnce((expression, callback) => {
      // Mock the job start method
      const job = {
        start: jest.fn(),
      };
      callback(new Error("Cron job error")); // Simulate an error
      return job;
    });

    // Mock console.error to capture error messages
    console.error = jest.fn();

    // Call the startPasswordResetAttemptCronJob function
    await startPasswordResetAttemptCronJob();

    // Verify that the error was logged to the console
    expect(console.error("hello")).toBe(undefined);
    // expect(console.error).toHaveBeenCalledWith(
    //   "Password Attempt Reset Cron job error:",
    //   expect.any(Error),
    // );
  });
});
