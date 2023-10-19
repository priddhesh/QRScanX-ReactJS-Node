require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const app = express();
const mysql = require("mysql2");
const {
  authenticate,
  getQR,
  deleteQR,
} = require("./database");

app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

let Email;

app.route("/qrcodes").post(async (req, res) => {
  let email = req.body.email;
  let content = req.body.content;
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const todayDate = `${year}-${month}-${day}`;

  pool.query(
    `INSERT INTO qrdata(email,content,date) VALUES('${email}','${content}','${todayDate}')`,
    (err, rows) => {
      if (err) throw err;
    }
  );
  res.send(req.body);
});

app.route("/qrcodes").get(async (req, res) => {
  // email = req.session.email
  let [data] = await getQR(Email);
  if (data) {
    res.send(data);
  } else {
    res.send({ result: "No products found" });
  }
});

app.route("/qrcodes/:id").delete(async (req, res) => {
  let id = req.params.id;
  let data = await deleteQR(id);
  if (data) {
    res.send(data);
  } else {
    res.send({ result: "No data deleted" });
  }
});

app.route("/login").post(async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  // req.session.email = email;
  Email = email;
  let [data] = await authenticate(email, password);
  if (data) {
    res.send(data);
  } else {
    res.send({ result: "No user found" });
  }
});

app.route("/register").post(async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let password = req.body.password;

  pool.query(
    `INSERT INTO users(email,name,password) VALUES('${email}','${name}','${password}')`,
    (err, rows) => {
      if (err) throw err;
    }
  );
  res.send(req.body);
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
