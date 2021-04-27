const Payment = require("./payment.model");
const User = require("../users/users.model");
const reminder = require("../_helpers/scheduler");

async function create({ amount, currency, customer_id, status }) {
  // simple validation
  if (!amount || !currency || !customer_id || !status)
    throw "Please fill all fileds";
  if (status !== "successful" && status !== "pending" && status !== "failed")
    throw "Incorrect Status String";
  // fetch user from database
  user = await User.findById(customer_id).catch((err) => {
    throw "No Such User";
  });

  // **payment logic**

  // set new payment
  newPayment = new Payment({
    amount,
    currency,
    customer_id,
    status,
  });
  // check payment status
  // set paid date to current date if successful
  if (newPayment.status === "successful") newPayment.paid_date = Date.now();
  // save payment in databse
  const payment = await newPayment.save().catch((err) => {
    throw err;
  });
  // if stauts is pending, schedule a reminder
  if (payment.status === "pending") reminder(payment, user);

  return payment;
}

async function getAll() {
  payments = await Payment.find({}).catch((err) => {
    throw err;
  });
  return payments;
}

async function getById(id) {
  payment = await Payment.findById(id).catch((err) => {
    throw err;
  });
  return payment;
}

async function updatePayment(id) {
  payment = await Payment.findByIdAndUpdate(
    id,
    { status: "successful" },
    { new: true }
  ).catch((err) => {
    throw err;
  });
  return payment;
}

async function softDeletePayment(id) {
  payment = await Payment.findByIdAndUpdate(
    id,
    { is_deleted: true, deleted_at: Date.now() },
    { new: true }
  ).catch((err) => {
    throw err;
  });
  return payment;
}

module.exports = {
  create,
  getAll,
  getById,
  updatePayment,
  softDeletePayment,
};
