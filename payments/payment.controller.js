const express = require("express");
const router = express.Router();

const paymentServices = require("./payment.services");

module.exports = router;

router.post("/", create);
router.get("/:id", getById);
router.get("/", getAll);
router.put("/:id", updatePayment);
router.delete("/:id", softDelete);

function create(req, res) {
  const { amount, customer_id, currency, status } = req.body;
  paymentServices
    .create({ amount, customer_id, currency, status })
    .then((payment) => res.json({ message: `Payment created`, payment }))
    .catch((err) => res.status(400).json({ message: err }));
}

function getById(req, res) {
  paymentServices
    .getById(req.params.id)
    .then((payment) => res.json(payment))
    .catch((err) => res.status(400).json({ message: err }));
}

function getAll(req, res) {
  paymentServices
    .getAll()
    .then((payments) => res.json(payments))
    .catch((err) => res.status(400).json({ message: err }));
}
function updatePayment(req, res) {
  paymentServices
    .updatePayment(req.params.id)
    .then((payment) => res.json({ message: `Payment updated`, payment }))
    .catch((err) => res.status(400).json({ message: err }));
}
function softDelete(req, res) {
  paymentServices
    .softDeletePayment(req.params.id)
    .then((payment) => res.json({ message: `Payment deleted`, payment }))
    .catch((err) => res.status(400).json({ message: err }));
}
