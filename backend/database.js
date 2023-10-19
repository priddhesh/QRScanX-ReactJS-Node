const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
  })
  .promise();


const authenticate = async (email, password) => {
  try {
    const [data] = await pool.query(
      `SELECT * FROM users WHERE email = ? AND password = ?`,
      [email, password]
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};


const getQR = async (email) => {
  try {
    const data = await pool.query(`SELECT * FROM qrdata WHERE email = ?`, [
      email,
    ]);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deleteQR = async (id) => {
  try {
    let uniqueID = parseInt(id);
    const data = await pool.query(`DELETE FROM qrdata WHERE id = ?`, [uniqueID]);

    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  authenticate,
  getQR,
  deleteQR,
};
