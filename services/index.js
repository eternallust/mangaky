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
const mangaController = require('./controllers/MangaController')
const chapterController = require('./controllers/ChapterController')
const pageController = require('./controllers/PageController')
const favoriteController = require('./controllers/FavoriteController')

app.group('/readmanga', router => {
  // Authentication API
  router.post('/register', authController.register); // signup
  router.post('/login', authController.login); // login
  router.get('/users', authController.show);

  // Manga API
  router.get('/manga',mangaController.show)
  router.get('/manga/:mangaId',mangaController.getManga)
  router.get('/manga/search/:title',mangaController.searchManga)
  router.post('/manga/add/user/:userId',mangaController.addManga)
  router.put('/manga/update/:mangaId',mangaController.updateManga)
  router.delete('/manga/delete/:mangaId',mangaController.deleteManga)
  router.get('/users/creation/:userId')

  // Chapter API
  router.get('/chapter/:mangaId',chapterController.getChapter)
  router.post('/chapter/add',chapterController.addChapter)
  router.put('/chapter/update/:chapterId',chapterController.updateChapter)
  router.delete('/chapter/delete/:chapterId',chapterController.deleteChapter)

  // Page API
  router.get('/page/:chapterId',pageController.getPage)
  router.post('/page/add',pageController.addPage)
  router.put('/page/update/:pageId',pageController.updatePage)
  router.delete('/page/delete/:pageId',pageController.deletePage)

  // Favorite
  router.get('/favorite/:userId',favoriteController.getFavorite)
  router.post('/favorite/add',favoriteController.addFavorite)
  router.delete('/favorite/delete/:favoriteId',favoriteController.deleteFavorite)
  router.get('/favorite/user/:userId/manga/:mangaId',favoriteController.getDetailFavorite)
});

app.listen(port, () => console.log(`Listening on port ${port}!`))