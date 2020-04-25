const fs = require('fs');
const uuid4 = require('uuid').v4;

const SESSIONS_FILE_PATH = __dirname + '/sessionsData.json';

const getSession = sessionId => {
  let sessions = JSON.parse(fs.readFileSync(SESSIONS_FILE_PATH));
  return sessions[sessionId];
};

const createSession = data => {
  const sessionId = uuid4();
  let sessions = JSON.parse(fs.readFileSync(SESSIONS_FILE_PATH));
  sessions[sessionId] = data;
  fs.writeFileSync(SESSIONS_FILE_PATH, JSON.stringify(sessions));
  return sessionId;
};

const ensureSessionsFile = () => {
  if (!fs.existsSync(SESSIONS_FILE_PATH)) {
    fs.writeFileSync(SESSIONS_FILE_PATH, "{}");
  }
};

module.exports = { createSession, getSession, ensureSessionsFile };
