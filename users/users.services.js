const User = require("./users.model");

const register = async ({ name, email }) => {
  //simple validation
  if (!name || !email) {
    throw "Please enter all fields";
  }
  // validate email format
  if (!validateEmail(email)) throw "Incorrect Email Format";

  // check if user exisit
  user = await User.findOne({ email }).exec();
  if (user) {
    throw "User alreday exisit";
  }

  // set new user
  const newUser = new User({
    name,
    email,
  });
  // save new user to database
  user = await newUser.save();

  return user._doc;
};

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

module.exports = {
  register,
};
