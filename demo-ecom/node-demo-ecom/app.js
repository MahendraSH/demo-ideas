const express = require("express");
const dotenv = require("dotenv").config({ path: "./config/.env.dev" });
const app = express();

module.exports = app;