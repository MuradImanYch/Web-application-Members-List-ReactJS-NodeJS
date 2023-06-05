const db = require('../db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
    db.query(`SELECT * FROM users WHERE username="${req.body.username}"`, (err, result) => {
        if(err) throw err;

        bcrypt.compare(req.body.password, result[0]?.password, (err, response) => {
            // if(err) throw err;

            response ? res.send({auth: true, token: result[0].token}) : res.send({message: 'Неверный логин или пароль', auth: false});
        });
    });
}


module.exports.registration = async (req, res) => {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const token = jwt.sign({
        username: req.body.username,
        password: passwordHash
    }, 'secretkey', {
        expiresIn: '30d'
    });

    db.query(`SELECT * FROM users WHERE username="${req.body.username}"`, (err, result) => {
        if(err) throw err;

        result.length > 0 ? res.send({message: 'Пользователь с таким логином уже существует', auth: false}) : db.query('INSERT INTO users (username, password, token, name, lName, fName, img, jobTitle, department, phone, email, role, wPhone, bDate) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [req.body.username, passwordHash, token, req.body.name, req.body.lName, req.body.fName, 'https://www.pngitem.com/pimgs/m/404-4042686_my-profile-person-icon-png-free-transparent-png.png', req.body.jobTitle, req.body.department, req.body.phone, req.body.email, 'viewer', req.body.wPhone, req.body.bDate], (err => {
            if(err) throw err;
            res.send({
                token: `${token}`,
                auth: true
            });
        }));
    });
}