const bcrypt = require('bcrypt');
const config = require('../config');
const User = require('../models/User').User;

const addUser = async user => {
  await new User({
    username: user.username,
    password: await bcrypt.hash(user.password, config.PASSWORD_SALT_ROUNDS),
    isAdmin: user.isAdmin || false
  }).save();
};

const userExists = async user => {
  return await User.exists({ username: user.username });
};

const authenticateUser = async userData => {
  const user = await User.findOne({ username: userData.username });
  if (user && await bcrypt.compare(userData.password, user.password)) {
    return user;
  }
  return  null;
};

const getUser = async username => {
  return await User.findOne({ username: username });
};

const deleteUser = async username => {
  await User.deleteOne({ username });
};

const ensureAdminUser = async () => {
  try {
    await addUser({
      username: config.ADMIN_USERNAME,
      password: config.ADMIN_PASSWORD,
      isAdmin: true
    });
  } catch (e) {
  }
};

module.exports = { addUser, userExists, authenticateUser, getUser, deleteUser, ensureAdminUser };
