const mongoose = require("mongoose");
const { Schema } = mongoose;

main().then(() => console.log("connected to database"))
      .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const orderSchema = new Schema ({
    item: String,
    price: Number,
});

const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order",
        },
     ], 
});

const Oredr = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const findCustomer = async () => {
    //  let cust1 = new Customer({
    //     name: "Rahul Kumar",
    // });
    // let order1 = await Oredr.findOne({item: "Chips"});
    // let order2 = await Oredr.findOne({item: "chocolate"});

    // cust1.orders.push(order1);
    // cust1.orders.push(order2);

    // let res = await cust1.save();
    // console.log(res);

    let result  = await Customer.find({}).populate("orders");
    console.log(result[0]);
};


// const addOredr = async () => {
//     let res = await Oredr.insertMany([
//         {item : "Samosha", price: 12},
//         {item : "Chips", price: 10},
//         {item: "chocolate", price: 80},
//     ]);
//     console.log(res);
// };

// addOredr();

// customerSchema.pre("findOneAndDelete", async () => {
//     console.log("Pre middlewear");
// });

customerSchema.post("findOneAndDelete", async (customer) => {
    if(customer.orders.length){
        let res = await Oredr.deleteMany({ _id: { $in: customer.orders} });
        console.log(res);
    }
});

const addCust = async() => {
    let newCust = new Customer({
        name: "Karan",
    });
    let newOrder = new Oredr({
        item: "Pizza", 
        price: 250
    });

    newCust.orders.push(newOrder);

    await newOrder.save();
    await newCust.save();

    console.log("New customer added");
};

const delCust = async () => {
    let data = await Customer.findByIdAndDelete("xyz");
    console.log(data);
};

addCust();
delCust();