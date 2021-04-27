const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PaymentSchema = new Schema({
  customer_id: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  request_date: {
    type: Date,
    default: Date.now,
  },
  due_date: {
    type: Date,
    default: () => Date.now() + 30 * 1000, // default due date to request date + 30s
  },
  paid_date: {
    type: Date,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  deleted_at: {
    type: Date,
  },
});

module.exports = Payment = mongoose.model("payment", PaymentSchema);
