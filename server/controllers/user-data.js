const db = require('../db.js');

module.exports.username = (req, res) => {
    db.query(`SELECT * FROM users WHERE token="${req.body.token}"`, ((err, result) => {
        res.send(result);
    }));
}

module.exports.save = (req, res) => {
    db.query(`UPDATE users SET name = '${req.body.name}', lname = '${req.body.lName}', fName = '${req.body.fName}', jobTitle = '${req.body.jobTitle}', department = '${req.body.department}', wPhone = '${req.body.wPhone}', phone = '${req.body.phone}', email = '${req.body.email}', img = '${req.body.img}', bDate = '${req.body.bDate}' WHERE token = '${req.body.token}'`, (err, result) => {
        if(err) throw err;
    });
}

module.exports.getDepartment = (req, res) => {
    db.query('SELECT department FROM users', ((err, result) => {
        res.send(result);
    }));
}

module.exports.findByDepartment = (req, res) => {
    db.query(`SELECT * FROM users WHERE department = "${req.body.department}"`, ((err, result) => {
        res.send(result);
    }));
}

module.exports.delete = (req, res) => {
    db.query(`DELETE FROM users WHERE id = ${req.body.id}`, (err => {
        if(err) throw err;
    }));
}

module.exports.saveAdminChangeData = (req, res) => {
    db.query(`UPDATE users SET name = '${req.body.name}', lname = '${req.body.lName}', fName = '${req.body.fName}', jobTitle = '${req.body.jobTitle}', department = '${req.body.department}', wPhone = '${req.body.wPhone}', phone = '${req.body.phone}', email = '${req.body.email}', img = '${req.body.img}', bDate = '${req.body.bDate}' WHERE id = '${req.body.id}'`, (err, result) => {
        if(err) throw err;
    });
}