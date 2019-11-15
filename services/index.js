require('express-group-routes');

const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const mkdirp = require('mkdirp');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const dirCoverManga = 'uploads/cover/';
    mkdirp(dirCoverManga.toString(), null);
    cb(null, dirCoverManga);
  },
  filename: function(req, file, cb) {
    const dirCoverManga = 'uploads/cover/';
    mkdirp(dirCoverManga.toString(), null);
    cb(null, file.originalname);
  },
});

const upload = multer({storage: storage});

const app = express();
const port = 5000;
app.use('/mangaky/uploads/cover/', express.static('uploads/cover'));

app.use(bodyParser.json());

const authController = require('./controllers/authController');

app.group('/readmanga', router => {
  // Authentication API
  router.post('/register', authController.register); // signup
  router.post('/login', authController.login); // login
  router.get('/users', authController.show);
});

app.listen(port, () => console.log(`Listening on port ${port}!`))