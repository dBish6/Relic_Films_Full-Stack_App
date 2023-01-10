const dal = require("../model/postgres.db.config");

const addUserToDb = async (username, email, password, phoneNum, favGenre) => {
  let response;
  try {
    response = await dal.query(
      `INSERT INTO "user"(username, email, password, phone_number, fav_genre) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [username, email, password, phoneNum, favGenre]
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

const existingUsername = async (username) => {
  let response;
  try {
    response = await dal.query(
      `SELECT username FROM "user" WHERE username = $1;`,
      [username]
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

const existingEmail = async (email) => {
  let response;
  try {
    response = await dal.query(`SELECT email FROM "user" WHERE email = $1;`, [
      email,
    ]);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// const existingPassword = async (password) => {
//   let response;
//   try {
//     response = await dal.query(
//       `SELECT password FROM "user" WHERE password = $1;`,
//       [password]
//     );
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// };

const getUserByIdFromDb = async (id) => {
  let response;
  try {
    response = await dal.query(`SELECT * FROM "user" WHERE user_id = $1;`, [
      id,
    ]);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getUserByUsernameFromDb = async (username) => {
  let response;
  try {
    response = await dal.query(`SELECT * FROM "user" WHERE username = $1;`, [
      username,
    ]);
    return response;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addUserToDb,
  existingUsername,
  existingEmail,
  // existingPassword,
  getUserByIdFromDb,
  getUserByUsernameFromDb,
};
