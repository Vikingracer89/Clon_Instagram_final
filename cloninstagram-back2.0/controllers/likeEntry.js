'use strict';
const { getConnection } = require('../db/db');

const likePhoto = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();

    // Recojo los parámetros
    const { id } = req.params;

    console.log(req);

    // Compruebo el usuario no sea el creador de la entrada
    const [current] = await connection.query(
      `
      SELECT user_id
      FROM photo
      WHERE id=?
    `,
      [id]
    );

    if (current[0].user_id === req.userId) {
      const error = new Error('No puedes votar tu propio post');
      error.httpStatus = 403;
      throw error;
    }

    // Compruebo que el usuario no votara anteriormente la entrada
    const [existingVote] = await connection.query(
      `
      SELECT id
      FROM likes
      WHERE id_user=? AND id_img=?
    `,
      [req.userId, id]
    );

    if (existingVote.length > 0) {
      const error = new Error('Ya votaste este post');
      error.httpStatus = 403;
      throw error;
    }

    // Añado el voto a la tabla
    await connection.query(
      `
      INSERT INTO likes( id_user, id_img)
      VALUES(?,?)
    `,
      [req.userId, id]
    );

    res.send({
      status: 'ok',
      message: `Post Votado`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = likePhoto;
