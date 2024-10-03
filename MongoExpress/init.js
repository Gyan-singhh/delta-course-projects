const mongoose = require('mongoose');
const Chat = require("./models/chat.js");

main().then(() => {
    console.log("connection sucessfful");
})
 .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        from: "aman",
        to: "banta",
        msg: "tu chutiya hai banta",
        created_at: new Date()
    },
    {
        from: "gyan",
        to: "bunty",
        msg: "still we are friends",
        created_at: new Date()
    },
    {
        from: "divash",
        to: "aman",
        msg: "ok so you do not love me",
        created_at: new Date()
    },
    {
        from: "priyanka",
        to: "mama",
        msg: "memda o memda",
        created_at: new Date()
    }
];

Chat.insertMany(allChats);