const {
  createPhoto,
  getAllPhotos,
  getAllPhotosUser,
  getPhotoById,
  detelePhotoById,
} = require('../db/Photos');
const { generateError, createPathIfNotExists } = require('../helpers');
const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');

const getPhotosController = async (req, res, next) => {
  try {
    const photos = await getAllPhotos();

    res.send({
      status: 'ok',
      data: photos,
    });
  } catch (error) {
    next(error);
  }
};

const getPhotosUserController = async (req, res, next) => {
  try {
    const photos = await getAllPhotosUser(req.params.id);

    res.send({
      status: 'ok',
      data: photos,
    });
  } catch (error) {
    next(error);
  }
};

const newPhotoController = async (req, res, next) => {
  try {
    const { text } = req.body;

    // console.log('req.body.text', text);
    // console.log('req.files', req.files);

    //Compruebo que exista una imagen
    if (!req.files || !text) {
      throw generateError('Debes postear una foto con un texto', 400);
    }

    let imageFileName;

    // verifico si tengo que procesar immagenes
    if (req.files && Object.keys(req.files).length > 0) {
      //console.log(Object.values(req.files));
      for (const photosData of Object.values(req.files).slice(0, 1)) {
        // Creo el path del directorio uploads
        const uploadsDir = path.join(__dirname, '../uploads');

        // Creo el directorio si no existe
        await createPathIfNotExists(uploadsDir);

        // Procesar la imagen a una altura de 100px y ancho autoescalado
        const image = sharp(photosData.data);
        image.resize({ height: 100 });

        // Guardo la imagen con un nombre aleatorio en el directorio uploads
        imageFileName = `${nanoid(24)}.jpg`;

        await image.toFile(path.join(uploadsDir, imageFileName));
      }
    }

    const id = await createPhoto(req.userId, text, imageFileName);
    const photo = await getPhotoById(id);
    res.send({
      status: 'ok',
      data: photo,
      message: `Post con id: ${id} creado correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

const getSinglePhotoController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const photo = await getPhotoById(id);

    res.send({
      status: 'ok',
      data: photo,
    });
  } catch (error) {
    next(error);
  }
};

const deletePhotoController = async (req, res, next) => {
  try {
    //req.userId
    const { id } = req.params;

    // Conseguir la información del post que quiero borrar
    const photo = await getPhotoById(id);

    // Comprobar que el usuario del token es el mismo que creó el post
    if (req.userId !== photo.user_id) {
      throw generateError(
        'Estás intentando borrar un post que no es tuyo',
        401
      );
    }

    // Borrar el post
    await detelePhotoById(id);

    res.send({
      status: 'ok',
      message: `El post con id: ${id} fue borrado`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPhotosController,
  getPhotosUserController,
  newPhotoController,
  getSinglePhotoController,
  deletePhotoController,
};
