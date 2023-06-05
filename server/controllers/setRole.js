const db = require('../db.js');

module.exports.admin = (req, res) => {
    db.query(`UPDATE users SET role = "admin" WHERE id = '${req.body.id}'`, ((err, result) => {
        if(err) throw err;
    }));
}

module.exports.removeAdm = (req, res) => {
    db.query(`UPDATE users SET role = "viewer" WHERE id = '${req.body.id}'`, ((err, result) => {
        if(err) throw err;
    }));
}