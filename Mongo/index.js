const mongoose = require('mongoose');

main()
    .then(() => {
    console.log("connection successful");
})
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});

const User = mongoose.model("User", userSchema);

// User.deleteMany({age: 37}).then((res) => {
//     console.log(res);
// });


// User.findOneAndUpdate({name: "Ram"}, {age: "35"}, {new: true}).then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// });

// User.find({age: {$gt: 30}})
//  .then((res) => {
//     console.log(res[0].name);
// })
//  .catch((err) => {
//         console.log(err);
//     });


// User.insertMany([
//     {name: "tony", email: "tony@.com", age: 23},
//     {name: "Peter", email: "peter@.com", age: 33},
//     {name: "Ram", email: "ram@.com", age: 43},
// ]).then((res) => {
//     console.log(res);
// });


// const user2 =  new User({
//     name: "gyan",
//     email: "gyan@yahoo.in",
//     age: 30
// });


// user2.save()
//  .then((res) => {
//     console.log(res);
// })
//  .catch((err) => {
//         console.log(err);
//     });