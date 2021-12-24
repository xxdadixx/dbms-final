var mysql = require('mysql');

var con = mysql.createConnection({
  host: "192.168.208.1",
  user: "san",
  password: "5RgTY#NMghC#E3$f",
  database: 'testing'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

getDomain();

function getDomain() {
    return dbQuery('SELECT * FROM users;');
}

// * Important promise function
function dbQuery(databaseQuery) {
    return new Promise(data => {
        con.query(databaseQuery, function (error, result) { // change db->connection for your code
            if (error) {
                console.log(error);
                throw error;
            }
            try {
                console.log(result);
            } catch (error) {
                throw error;
            }

        });
    });

}

    