const PollController = require("../controllers/PollsController");
const PageController = require("../controllers/PageController");

module.exports = (app) => {
  app.get("/", PageController.DashboardShow);

  app.post("/api/poll", PollController.createPoll);
  app.get("/api/poll/byId", PollController.getPollById);
  app.get("/api/polls", PollController.getRecentPolls);
  app.get("/api/polls/topThree", PollController.getTopThreePolls);
  app.post("/api/poll/vote", PollController.votePoll);

  app.get("/Poll-Create", PageController.PollFormShow);
  app.get("/Poll-Home", PageController.DashboardShow);
  app.get("/Poll-Vote", PageController.PollVoteShow);
  app.get("/Poll-Show", PageController.PollShow);

  app.get("/View-Show", PageController.ViewShow);
};
