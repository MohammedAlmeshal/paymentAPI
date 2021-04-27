const Agenda = require("agenda");
const db = require("./db");
const sendEmail = require("../_services/mailer");
const Payment = require("../payments/payment.model");

const agenda = new Agenda();

// When mongoose is connected to MongoDB
db.connect.then(() => {
  agenda.mongo(db.mongoose.connection.db, "agendaJobs");
  // setup a reminder
  agenda.define(
    "send email reminder",
    { priority: "high", concurrency: 10 },
    async (job) => {
      const { payment, user } = job.attrs.data;
      checkedPayment = await Payment.findById(payment._id).catch((err) => {
        throw err;
      });
      // check at due date if status is still pending
      if (checkedPayment.status === "pending") {
        console.log(
          `Dear ${user.name}, your payment with number ${checkedPayment._id} is overdue`
        );
        checkedPayment.status = "overdue";
        await checkedPayment.save();
        sendEmail(user);
      } else {
        console.log("Payment is not pending");
      }
    }
  );
});

const reminder = async (payment, user) => {
  // setup reminder event at due date
  await agenda.start();
  await agenda.schedule(payment.due_date, "send email reminder", {
    payment,
    user,
  });
};
module.exports = reminder;
