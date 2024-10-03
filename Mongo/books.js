const mongoose = require("mongoose");

main()
    .then(() => {
    console.log("connection successful");
})
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    },
    price: {
        type: Number,
        min: [1, "Price is too Low for selling"],
    },
    discount: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        //enum: ["friction", "non-friction", others],
    }
});

const Book = mongoose.model("Book", bookSchema);

Book.findByIdAndUpdate(
    "65bbed51ecf56337f8bb60c7",
    {price: -100},
    {runValidators: true}
)
.then((res) => {
    console.log(res);
})
 .catch((err) => {
        console.log(err.errors.price.properties.message);
    });

// let book1 = new Book({
//     title: "Mathematics XII",
//     author: "RD Sharma",
//     price: 1200
// });

// book1.save()
//  .then((res) => {
//     console.log(res);
// })
//  .catch((err) => {
//         console.log(err);
//     });