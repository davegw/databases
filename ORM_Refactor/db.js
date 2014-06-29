var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "TEST123",
  database: "chat"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/
dbConnection.userInsert = function(message) {
  var userInsertQuery = "INSERT IGNORE INTO Users (name) VALUES (?)";
  dbConnection.query(userInsertQuery, [message.username],  function(err, results) {
    dbConnection.roomInsert(message);
  });
};

dbConnection.roomInsert = function(message) {
  var roomInsertQuery = "INSERT IGNORE INTO Rooms (name) VALUES (?)";
  dbConnection.query(roomInsertQuery, [message.roomname],  function(err, results) {
    dbConnection.getUserID(message);
  });
};

dbConnection.getUserID = function(message) {
  var getUserIDQuery = "SELECT u_id FROM Users WHERE name = ?";
  dbConnection.query(getUserIDQuery, [message.username], function (err, results) {
    var u_id = results[0].u_id;
    dbConnection.getRoomID(u_id, message);
  });
};

dbConnection.getRoomID = function(u_id, message) {
  var getRoomIDQuery = "SELECT r_id FROM Rooms WHERE name = ?";
  dbConnection.query(getRoomIDQuery, [message.roomname], function (err, results) {
    var r_id = results[0].r_id;
    dbConnection.msgInsert(u_id, r_id, message.text);
  });
};

dbConnection.msgInsert = function(u_id, r_id, message) {
  var msgInsertQuery = "INSERT INTO Messages (u_id, r_id, message) " +
                        "VALUES (?, ?, ?)";
  dbConnection.query(msgInsertQuery, [u_id, r_id, message], function(err, results) {
  });
};

exports.dbConnection = dbConnection;


