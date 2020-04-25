const bcrypt = require('bcrypt');
const fs = require('fs');
const config = require('../config');

const addUser = async user => {
  let users = JSON.parse(fs.readFileSync(config.USERS_FILE_PATH));
  users[user.username] = await bcrypt.hash(user.password, config.PASSWORD_SALT_ROUNDS);
  fs.writeFileSync(config.USERS_FILE_PATH, JSON.stringify(users));
};

const userExists = user => {
  let users = JSON.parse(fs.readFileSync(config.USERS_FILE_PATH));
  return !!users[user.username];
};

const authenticateUser = async user => {
  let users = JSON.parse(fs.readFileSync(config.USERS_FILE_PATH));
  return users[user.username] && await bcrypt.compare(user.password, users[user.username]);
};

const ensureUsersFile = () => {
  if (!fs.existsSync(config.USERS_FILE_PATH)) {
    fs.writeFileSync(config.USERS_FILE_PATH, "{}");
  }
};

module.exports = { addUser, userExists, ensureUsersFile, authenticateUser };
