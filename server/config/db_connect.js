var mysql = require('mysql');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "votingsystem"
});
con.connect(function (err) {
  if (err) throw err;
  console.log("DB Connected!");
});

var getConnection = function () {
  return con;
}

module.exports = {
  getconnection: getConnection
};