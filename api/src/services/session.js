const fs = require('fs');
const uuid4 = require('uuid').v4;
const config = require('../config');

const getSession = sessionId => {
  let sessions = JSON.parse(fs.readFileSync(config.SESSIONS_FILE_PATH));
  return sessions[sessionId];
};

const createSession = data => {
  const sessionId = uuid4();
  let sessions = JSON.parse(fs.readFileSync(config.SESSIONS_FILE_PATH));
  sessions[sessionId] = data;
  fs.writeFileSync(config.SESSIONS_FILE_PATH, JSON.stringify(sessions));
  return sessionId;
};

const deleteSession = sessionId => {
  let sessions = JSON.parse(fs.readFileSync(config.SESSIONS_FILE_PATH));
  sessions = Object.keys(sessions).reduce((allSessions, sid) => {
    if (sid !== sessionId) {
      allSessions[sid] = sessions[sid];
    }
    return allSessions;
  }, {});
  fs.writeFileSync(config.SESSIONS_FILE_PATH, JSON.stringify(sessions));
};

const ensureSessionsFile = () => {
  if (!fs.existsSync(config.SESSIONS_FILE_PATH)) {
    fs.writeFileSync(config.SESSIONS_FILE_PATH, "{}");
  }
};

module.exports = { createSession, getSession, ensureSessionsFile, deleteSession };
