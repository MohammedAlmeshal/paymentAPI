const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// DB config
const db = process.env.MONGO_URI;
// Connect to mongo db
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);
const connect = mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.log(err));

module.exports = {
  connect,
  mongoose,
};
