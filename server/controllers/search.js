const db = require('../db.js');

module.exports.search = (req, res) => {
    db.query(`SELECT * FROM users WHERE username LIKE "%${req.body.text}%" OR name LIKE "%${req.body.text}%" OR lName LIKE "%${req.body.text}%" OR fName LIKE "%${req.body.text}%" OR jobTitle LIKE "%${req.body.text}%" OR department LIKE "%${req.body.text}%" OR wPhone LIKE "%${req.body.text}%" OR email LIKE "%${req.body.text}%"`, ((err, result) => {
        res.send(result);
    }));
}