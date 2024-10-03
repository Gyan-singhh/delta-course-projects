const express = require("express");
const app = express();
const path = require("path");

//console.dir(app);

let port = 8080;
//app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "/public/js")));
app.use(express.static(path.join(__dirname, "/public/css")));

//app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/rolldice", (req, res) => {
    let diceVal = Math.floor(Math.random() * 6) +1;
    res.render("rolldice.ejs", {diceVal});
});

app.get("/:hello", (req, res) => {
   let username = req.params;
    res.render("instagram.ejs",{username});
});

app.get("/ig/:username", (req, res) => {
        const followers = ["aman","gyan","singh","fuckyou"];
        let { username } = req.params;
        res.render("instagram.ejs", {username, followers});

    const instaData = require("./data.json");
    const data = instaData[username];
    console.log(data);
    res.render("insta.ejs", { data });
});

app.listen(port, () => {
    console.log(`appp is listening on port ${port}`);
});