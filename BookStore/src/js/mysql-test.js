/**
 * Created by ff on 15/8/22.

var Client = require('mysql').Client;
var client = new Client();
client.host = 'localhost';
client.user = 'root';
client.password = 'root';
client.database = 'test';
 */
var mysql = require('mysql');
var conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'test',

});
conn.connect();
conn.query(
        'select * from info',
        function(err,rows,fields){
            console.log(rows);
            console.log('the solution is:',rows[0]);
        }
);
conn.end();
