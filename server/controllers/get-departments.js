const db = require('../db.js');

module.exports.departments = (req, res) => {
    db.query('SELECT * FROM departments', ((err, result) => {
        if(err) throw err;
        res.send(result);
    }));
}
module.exports.jobTitles = (req, res) => {
    db.query('SELECT * FROM jobtitles', ((err, result) => {
        if(err) throw err;
        res.send(result);
    }));
}
