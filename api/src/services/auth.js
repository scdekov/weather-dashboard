const bcrypt = require('bcrypt');
const fs = require('fs');
const config = require('../config');

const addUser = async user => {
  let users = JSON.parse(fs.readFileSync(config.USERS_FILE_PATH));
  users[user.username] = {
    password: await bcrypt.hash(user.password, config.PASSWORD_SALT_ROUNDS),
    isAdmin: user.isAdmin || false
  };
  fs.writeFileSync(config.USERS_FILE_PATH, JSON.stringify(users));
};

const userExists = user => {
  let users = JSON.parse(fs.readFileSync(config.USERS_FILE_PATH));
  return !!users[user.username];
};

const authenticateUser = async user => {
  let users = JSON.parse(fs.readFileSync(config.USERS_FILE_PATH));
  return users[user.username] && await bcrypt.compare(user.password, users[user.username].password);
};

const ensureUsersFile = () => {
  if (!fs.existsSync(config.USERS_FILE_PATH)) {
    fs.writeFileSync(config.USERS_FILE_PATH, "{}");
    addUser({
      username: 'admin',
      password: config.ADMIN_PASSWORD,
      isAdmin: true
    });
  }
};

module.exports = { addUser, userExists, ensureUsersFile, authenticateUser };
