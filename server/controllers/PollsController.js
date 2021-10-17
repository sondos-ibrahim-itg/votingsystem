var PollModel = require("../models/pollModel.js");


const getPollById = async (req, res) => {
  var reqBody = req.query;
  PollModel.populatePollById(reqBody.poll_id).then(function (poll) {

      res.json({ "success" : true, "poll": poll });
        
  }).catch((err) => setImmediate(() => {
    throw err;
  }));

};

const createNewPoll = async (req, res) => {
  var reqBody = req.body;
  PollModel.insertPoll(reqBody.question).then(function (rows) {
    var poll_id = rows.insertId;

    PollModel.insertAnswer(poll_id, reqBody).then(function (rows) {
      res.json({ "success" : true, "poll_id": poll_id });
      
    }).catch((err) => setImmediate(() => {
      throw err;
    }));
        
  }).catch((err) => setImmediate(() => {
    throw err;
  }));

};

const getRecentPolls = (req, res) => {
    PollModel.populatePollsByDate().then(function (polls) {
      res.json({ "success" : true, "polls": polls });

    }).catch((err) => setImmediate(() => {
      throw err;
    }));
};


const getTopThreePolls = (req, res) => {
  PollModel.populateTopThreePolls().then(function (polls) {
    res.json({ "success" : true, "polls": polls });

  }).catch((err) => setImmediate(() => {
    throw err;
  }));
};

const votePoll = async (req, res) => {
  var reqBody = req.body;
  PollModel.updatePollAnswer(reqBody.poll_id, reqBody.answer_id).then(function (rows) {
    res.json({ "success" : true });

  }).catch((err) => setImmediate(() => {
    throw err;
  }));
};

module.exports = {
  getPollById: getPollById,
  createPoll: createNewPoll,
  getRecentPolls: getRecentPolls,
  getTopThreePolls: getTopThreePolls,
  votePoll: votePoll
};