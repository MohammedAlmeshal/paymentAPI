const express = require("express");
const router = express.Router();

const userServices = require("./users.services");

module.exports = router;

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  userServices
    .register({ name, email, password })
    .then((user) => res.json({ message: "Registration successful", ...user }))
    .catch((err) => res.status(400).json({ message: err }));
});
