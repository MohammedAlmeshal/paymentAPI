const express = require("express");
const dotenv = require("dotenv");
const db = require("./_helpers/db");
const sendEmail = require("./_services/mailer");
const Agenda = require("agenda");
const users = require("./users/users.controller");
const payments = require("./payments/payment.controller");

dotenv.config();
const app = express();
db.connect;

app.use(express.json());

// Use routes
app.use("/users", users);
app.use("/payments", payments);

// sendEmail();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
