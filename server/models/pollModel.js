const util = require('util');
const mapping = require('json-mapping');
var DBConnection = require("../config/db_connect.js");

const INSERT_POLLS_SQL = "INSERT INTO polls (question) VALUES (?)";
const INSERT_ANS_SQL = "INSERT INTO answers (poll_id, answer_text, num_of_votes) VALUES ?";
const SELECT_POLLS_SQL = "select * from (SELECT p.poll_id, p.question, p.creation_date, GROUP_CONCAT(a.answer_id, '|', a.answer_text, '|', a.num_of_votes) as answers FROM votingsystem.polls p inner join answers a on p.poll_id = a.poll_id group by p.poll_id) as poll order by poll.creation_date desc";
const SELECT_TOP3_POLLS_SQL = "SELECT * from  (SELECT p.poll_id, p.question, p.creation_date, GROUP_CONCAT(a.answer_id, '|', a.answer_text, '|', a.num_of_votes) as answers, sum(a.num_of_votes) as total_votes FROM polls p , answers a where p.poll_id = a.poll_id group by p.poll_id) as polls order by polls.total_votes desc  LIMIT 3";
const UPDATE_POLLS_ANS_SQL = "Update answers set num_of_votes = num_of_votes + 1 where poll_id = (?) and answer_id =( ?)";
const SELECT_POLL_SQL = "SELECT p.poll_id, p.question, p.creation_date, GROUP_CONCAT(a.answer_id, '|', a.answer_text, '|', a.num_of_votes) as answers, sum(a.num_of_votes) as total_votes FROM polls p , answers a where p.poll_id = a.poll_id and p.poll_id = ?";


function populatePollById(poll_id) {
    return new Promise(function (resolve, reject) {
        var connection = DBConnection.getconnection();
        var query_var = [Number(poll_id)];
        connection.query(SELECT_POLL_SQL, query_var, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            var poll = parsePollRows(rows);
            resolve(poll);
        });
    });
}

function insertPoll(pollQuestion) {
    return new Promise(function (resolve, reject) {
        var connection = DBConnection.getconnection();

        var query_var = [pollQuestion];

        connection.query(INSERT_POLLS_SQL, query_var, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

function insertAnswer(poll_id, answers) {
    return new Promise(function (resolve, reject) {
        var connection = DBConnection.getconnection();

        var query_var = [];
        var count = 0;
        for (const param in answers) {
            if (param.startsWith('option')) {
                query_var[count++] = [poll_id, answers[param], 0];
            }
        }
        connection.query(INSERT_ANS_SQL, [query_var], function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}


function populatePollsByDate() {
    return new Promise(function (resolve, reject) {
        var connection = DBConnection.getconnection();

        connection.query(SELECT_POLLS_SQL, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            var polls = parsePollRows(rows);
            resolve(polls);
        });
    });
}


function populateTopThreePolls() {
    return new Promise(function (resolve, reject) {
        var connection = DBConnection.getconnection();

        connection.query(SELECT_TOP3_POLLS_SQL, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            var polls = parsePollRows(rows);
            resolve(polls);
        });
    });
}


function updatePollAnswer(poll_id, answer_id) {
    return new Promise(function (resolve, reject) {
        var connection = DBConnection.getconnection();

        var query_var = [poll_id, answer_id];
        connection.query(UPDATE_POLLS_ANS_SQL, [poll_id, answer_id], function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

function parsePollRows(rows) {
    var polls = new Array();

    for (const key in rows) {
        var data = {};
        var rowData = rows[key];
        data.poll_id = rowData.poll_id;
        data.question = rowData.question;
        data.creation_date = rowData.creation_date;
        if (rowData.total_votes) {
            data.total_votes = rowData.total_votes;
        }
        var answers = rowData.answers.split(",");
        var ansArr = new Array();

        for (const ansKey in answers) {
            var ansTextVote = answers[ansKey].split('\|');
            var answer = {};
            answer.id = ansTextVote[0];
            answer.text = ansTextVote[1];
            answer.vote = ansTextVote[2];
            ansArr.push(answer);
        }
        data.answers = ansArr;
        polls.push(data);
    }
    return polls;
}

module.exports = {
    populatePollById,
    insertPoll,
    insertAnswer,
    populatePollsByDate,
    populateTopThreePolls,
    updatePollAnswer
};