const express = require("express");
const app = express();
const port = 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/register", (req, res) => {
    //console.log(req.query);
    let {user, password} = req.query;
    res.send(`standard GET response. welcome ${user} !`);
});

app.post("/register", (req, res) => {
   // console.log(req.body);
   let {user, password} = req.body;
    res.send(`standard post response. welcome ${user} !`);
});

app.listen(port, () => {
    console.log(`listening port ${port}`);
});
