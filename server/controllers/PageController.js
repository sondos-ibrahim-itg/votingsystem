
const PollFormShow = (req, res) => {
    var viewData = { 
        template: 'pollForm'
    }
    res.render('layout/page.ejs', viewData);
};

const DashboardShow = (req, res) => {
    var viewData = { 
        template: 'dashboard'
    }
    res.render('layout/page.ejs', viewData);
};
const PollVoteShow = (req, res) => {
    var viewData = { 
        template: 'vote',
        poll_id: req.query.poll_id
    }
    res.render('layout/page.ejs', viewData);
};

const PollShow = (req, res) => {
    var viewData = { 
        template: 'view',
        poll_id: req.query.poll_id
    }
    res.render('layout/page.ejs', viewData);
};

const ViewShow = (req, res) => {
    res.render(req.query.template, req.query);
};

module.exports = {
    PollFormShow: PollFormShow,
    DashboardShow: DashboardShow,
    PollVoteShow: PollVoteShow,
    PollShow: PollShow,
    ViewShow: ViewShow
};