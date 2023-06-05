const db = require('mysql');

const con = db.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
con.connect(err => {
    if(err) throw err;
    console.log('Connected to DB');
});

module.exports = con;