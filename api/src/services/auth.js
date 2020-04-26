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

const authenticateUser = async userData => {
  const users = JSON.parse(fs.readFileSync(config.USERS_FILE_PATH));
  const user = users[userData.username];
  if (user && await bcrypt.compare(userData.password, user.password)) {
    return user;
  }
  return  null;
};

const getUser = username => {
  const users = JSON.parse(fs.readFileSync(config.USERS_FILE_PATH));
  return users[username] ? { ...users[username], username: username } : null;
};

const deleteUser = username => {
  let users = JSON.parse(fs.readFileSync(config.USERS_FILE_PATH));
  users = Object.keys(users).reduce((allUsers, u) => {
    if (u !== username) {
      allUsers[u] = users[u];
    }
    return allUsers;
  }, {});
  fs.writeFileSync(config.USERS_FILE_PATH, JSON.stringify(users));
};

const ensureUsersFile = () => {
  if (!fs.existsSync(config.USERS_FILE_PATH)) {
    fs.writeFileSync(config.USERS_FILE_PATH, "{}");
    addUser({
      username: config.ADMIN_USERNAME,
      password: config.ADMIN_PASSWORD,
      isAdmin: true
    });
  }
};

module.exports = { addUser, userExists, ensureUsersFile, authenticateUser, getUser, deleteUser };
