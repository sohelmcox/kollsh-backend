const request = require("supertest");
const app = require("../src/app/app"); // Import your Express app
const agent = request.agent(app);

// Set the global base URL
agent.baseUrl = "/api/v1"; // Replace with your base URL

// console.log("Global Base URL:", agent.baseUrl); // Log the global base URL
module.exports = agent;
