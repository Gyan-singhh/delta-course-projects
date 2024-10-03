const express = require("express");
const app = express();

//console.dir(app);

let port = 8080;

app.listen(port, () => {
    console.log(`appp is listening on port ${port}`);
});

app.get("/hospital", (req, res) => {
    res.send("you are asking for help to hospital");
});

app.get("*", (req, res) => {
    res.send("you are nothing but a dumb  guy");
});

// app.use((req, res) => {
//     //console.log(req);
//     console.log("request is received");
//     res.send({
//         colour : "red",
//         name : "gyan",

//     });
// });