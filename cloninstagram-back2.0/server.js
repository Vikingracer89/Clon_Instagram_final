require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const { PORT } = process.env;

const {
  newUserController,
  getUserController,
  loginController,
} = require('./controllers/users');

const {
  getPhotosController,
  getPhotosUserController,
  newPhotoController,
  getSinglePhotoController,
  deletePhotoController,
} = require('./controllers/Photos');

const { authUser } = require('./middlewares/auth');
const likePhoto = require('./controllers/likeEntry');
const cors = require('cors');
const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('./uploads'));
app.use(cors());

//Rutas de usuario
app.post('/signup', newUserController);
app.get('/user', authUser, getUserController);
app.get('/user/:id', getUserController);
app.post('/user/login', loginController);

//Rutas de post
app.post('/photos', authUser, newPhotoController);
app.get('/photos', getPhotosController);
app.get('/photos/user/:id', getPhotosUserController);
app.get('/photos/:id', getSinglePhotoController);
app.delete('/photos/:id', authUser, deletePhotoController);

//rutas de like
app.post('/photos/:id/like', authUser, likePhoto);
app.get('/photos/:id/like', authUser, likePhoto);

// Middleware de 404
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

// Middleware de gestión de errores
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

// Lanzamos el servidor
app.listen(PORT, () => {
  console.log('Servidor funcionando! 👻');
});
