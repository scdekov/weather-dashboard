const bcrypt = require('bcrypt');
const fs = require('fs');
const config = require('../config');

const USERS_FILE_PATH = __dirname + '/usersData.json';

const addUser = async user => {
  let users = JSON.parse(fs.readFileSync(USERS_FILE_PATH));
  users[user.username] = await bcrypt.hash(user.password, config.PASSWORD_SALT_ROUNDS);
  fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users));
};

const userExists = async user => {
  let users = JSON.parse(fs.readFileSync(USERS_FILE_PATH));
  return users[user.username];
};

const authenticateUser = async user => {
  let users = JSON.parse(fs.readFileSync(USERS_FILE_PATH));
  return users[user.username] && await bcrypt.compare(user.password, users[user.username]);
};

const ensureUsersFile = () => {
  if (!fs.existsSync(USERS_FILE_PATH)) {
    fs.writeFileSync(USERS_FILE_PATH, "{}");
  }
};

module.exports = { addUser, userExists, ensureUsersFile, authenticateUser };
