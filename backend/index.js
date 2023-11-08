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
app.use(cors({
  origin: ["http://localhost:3000"],
  methods : ["POST","GET"],
  credentials : true
}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie:{
     secure: false,
     maxAge : 1000*60*60*24
  }
}));

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
  console.log(req.session);
  let [data] = await getQR(Email);
  if (data) {
    res.send(data);
  } else {
    res.send({ result: "No data found" });
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
  Email = email;
  let [data] = await authenticate(email, password);
  if (data) {
    req.session.user = email;
    res.send(data);
  } else {
    res.send({ result: "No user found" });
  }
  console.log(req.session);
});

app.route("/register").post(async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let password = req.body.password;

  pool.query(
    `INSERT INTO users(email,name,password) VALUES('${email}','${name}','${password}')`,
    (err, rows) => {
      req.session.user = email;
      if (err) throw err;
    }
  );
  res.send(req.body);
});

app.route("/isLoggedIn").get((req,res)=>{
    let user = req.session.user;
    console.log(req.session);
    if(user===undefined || !user){
      res.send({"isLoggedIn":false});
    }else{
      res.send({"isLoggedIn":true});
    }
});



app.listen(5000, () => {
  console.log("Listening on port 5000");
});
