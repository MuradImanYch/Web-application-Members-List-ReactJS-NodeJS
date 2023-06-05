const db = require('../db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.forgot = async (req, res) => {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    db.query(`SELECT * FROM users WHERE email="${req.body.email}"`, (err, result) => {
        if(err) throw err;

        result.length === 0 ? res.send({message: 'Пользователь с такой почтой нет в базе', auth: false}) : db.query(`UPDATE users SET password = "${passwordHash}" WHERE email = "${req.body.email}"`, ((err, result) => {
            if(err) throw err;
        }));
    });
}