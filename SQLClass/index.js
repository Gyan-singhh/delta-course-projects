const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "Gyansingh@6840" 
});

let getRandomUser = () => {
  return [
     faker.string.uuid(),
     faker.internet.userName(),
     faker.internet.email(),
     faker.internet.password(),
  ];
};

//Home route
app.get("/", (req, res) => {
  let q = "select count(*) from user;"
  try {
    connection.query(q, (err, result) => {
      if(err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs", {count});
    });
  } catch (err){
    console.log(err);
    res.send("some error cougth in databse");
  }
});

//Show Route
app.get("/user", (req, res) => {
  let q = "select * from user";
  try {
    connection.query(q, (err, users) => {
      if(err) throw err;
      res.render("show.ejs", {users})
    });
  } catch (err){
    console.log(err);
    res.send("some error cougth in databse");
  }
});

//Edit Route
app.get("/user/:id/edit", (req, res) => {
  let {id} = req.params;
  let q = `select * from user where id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if(err) throw err;
      let user = result[0];
      console.log(user);
      res.render("edit.ejs", {user});
    });
  } catch (err){
    console.log(err);
    res.send("some error cougth in databse");
  }
});

//Update Route
app.patch("/user/:id", (req, res) => {
  let {id} = req.params;
  let { password: formpas, username: newuser} = req.body;
  let q = `select * from user where id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if(err) throw err;
      let user = result[0];

      if(formpas != user.password){      
        res.redirect("/user");
      } 
      else {
        let q2 = `UPDATE user SET username='${newuser}' WHERE id='${id}'`;
        connection.query(q2, (err, result) => {
          if(err) throw err;
          res.redirect("/user");
        });
      }
    });
  } catch (err){
    console.log(err);
    res.send("some error cougth in databse");
  }
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});

// let q = "INSERT INTO user (id, username, email, password) VALUES ?";
//let user = ["123", "123_newuser", "abcd@gmail.com", "abc"];

// let data = [];
// for (let i=1; i<=100; i++){
//   data.push(getRandomUser());
// }

// try {
//   connection.query(q, [data], (err, result) => {
//     if(err) throw err;
//     console.log(result);
//    // console.log(result.length);
//   });
// } catch (err){
//   console.log(err);
// }
// connection.end();





