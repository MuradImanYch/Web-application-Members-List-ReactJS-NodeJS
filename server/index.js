const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');

const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');
const userDataRoutes = require('./routes/user-data');
const getUserDataRoutes = require('./routes/get-user-data');
const setRoleRoutes = require('./routes/setRole');
const forgotPswRoutes = require('./routes/forgot-psw');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);
app.use('/search', searchRoutes);
app.use('/user-data', userDataRoutes);
app.use('/get-user-data', getUserDataRoutes);
app.use('/set-role', setRoleRoutes);
app.use('/forgot-psw', forgotPswRoutes);

const storage = multer.diskStorage({ // multer handler
    destination: (req, file, cb) => {
        cb(null, './public/static/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({storage});
app.use('/public/static/uploads', express.static('./public/static/uploads'));

app.post('/upload', upload.single('image'), (req, res) => { // uploads handle
    res.send({
        url: `/public/static/uploads/${req.file.originalname}`
    });
});

app.listen(PORT, (err) => {
    if(err) return err;
    console.log(`Server on ${PORT} is running...`);
});