const db = require('../db.js');

module.exports.getUserData = (req, res) => {
    db.query(`SELECT * FROM users WHERE id=${req.body.id}`, ((err, result) => {
        res.send(result);
    }));
}