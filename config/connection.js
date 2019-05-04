var mysql = require("mysql");

if (process.env.CLEARDB_DATABASE_URL) {
    mysql://b65896c035574d:40a43228@us-cdbr-iron-east-02.cleardb.net/heroku_b84cc6620c0e7d2?reconnect=true
    connection = mysql.createConnection({
        host: "us-cdbr-iron-east-02.cleardb.net",
        user: "b65896c035574d",
        password: "40a43228",
        database: "heroku_b84cc6620c0e7d2"
    });
} else {
    connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Killmonger1!",
        database: "burgers_db"
    });
};

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;

