const request = require("supertest");
const app = require("../src/app/app");
const agent = request.agent(app);

// Set the global base URL
agent.baseUrl = "/api/v1";

// console.log("Global Base URL:", agent.baseUrl);
module.exports = agent;
