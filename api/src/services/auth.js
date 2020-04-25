const fs = require('fs');

const USERS_FILE_PATH = __dirname + '/usersData.json';

const addUser = user => {
  let users = JSON.parse(fs.readFileSync(USERS_FILE_PATH));
  users[user.username] = user.password;
  fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users));
};

const userExists = user => {
  let users = JSON.parse(fs.readFileSync(USERS_FILE_PATH));
  return users[user.username] && users[user.username] === user.password;
};

const ensureUsersFile = () => {
  if (!fs.existsSync(USERS_FILE_PATH)) {
    fs.writeFileSync(USERS_FILE_PATH, "{}");
  }
};

module.exports = { addUser, userExists, ensureUsersFile };
