const uuid4 = require('uuid').v4;
const config = require('../config');
const Session = require('../models/Session').Session;

const getSession = async sessionid => {
  return await Session.findOne({ sessionid });
};

const createSession = async username => {
  const sessionid = uuid4();
  const newSession = new Session({ sessionid, username });
  await newSession.save();
  return sessionid;
};

const deleteSession = async sessionid => {
  await Session.deleteOne({ sessionid });
};

module.exports = { createSession, getSession, deleteSession };
