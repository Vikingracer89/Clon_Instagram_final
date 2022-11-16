require('dotenv').config();

const { getConnection } = require('./db');

async function main() {
  let connection;

  try {
    connection = await getConnection();

    //¡¡¡ESTO BORRA LA DB USAR SOLO EN PRUEBAS!!!
    console.log('Borrando tablas existentes');
    await connection.query('DROP TABLE IF EXISTS likes');
    await connection.query('DROP TABLE IF EXISTS photo');
    await connection.query('DROP TABLE IF EXISTS users');
    //¡¡¡ESTO BORRA LA DB USAR SOLO EN PRUEBAS!!!

    console.log('Creando tablas');

    await connection.query(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE photo (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        text VARCHAR(280) NOT NULL,
        image VARCHAR(100),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
        );
    `);

    await connection.query(`
      CREATE TABLE likes (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        id_user INTEGER NOT NULL,
        id_img INTEGER NOT NULL,
        FOREIGN KEY (id_img) REFERENCES photo(id)
        );
     `);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

main();
