const { generateError } = require('../helpers');
const { getConnection } = require('./db');

const detelePhotoById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `
      DELETE FROM photo WHERE id = ?
    `,
      [id]
    );

    return;
  } finally {
    if (connection) connection.release();
  }
};

const getPhotoById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT * FROM photo WHERE id = ?
    `,
      [id]
    );

    if (result.length === 0) {
      throw generateError(`El post con id: ${id} no existe`, 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

const getPhotoByText = async (text) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT * FROM photo WHERE text = ?
    `,
      [text]
    );

    if (result.length === 0) {
      throw generateError(`El post con el texto ${text} no existe`, 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

const getAllPhotos = async () => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(`
      SELECT photo.id, user_id, text, image, photo.created_at, email
      FROM photo 
      LEFT JOIN users on (photo.user_id = users.id)
      ORDER BY created_at DESC
    `);

    //console.log('getAllPhotos', result);

    return result;
  } finally {
    if (connection) connection.release();
  }
};

const getAllPhotosUser = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT photo.id, user_id, text, image, photo.created_at, email
      FROM photo 
      LEFT JOIN users on (photo.user_id = users.id)
      WHERE user_id = ? 
      ORDER BY created_at DESC
    `,
      [id]
    );

    //console.log('getAllPhotosUser', result);

    return result;
  } finally {
    if (connection) connection.release();
  }
};

const createPhoto = async (userId, text, image = '') => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      INSERT INTO photo (user_id, text, image)
      VALUES(?,?,?)
    `,
      [userId, text, image]
    );

    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createPhoto,
  getAllPhotos,
  getAllPhotosUser,
  getPhotoById,
  detelePhotoById,
  getPhotoByText,
};
