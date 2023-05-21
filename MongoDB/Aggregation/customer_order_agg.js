const mongoose = require('mongoose');
const uri = 'mongodb+srv://sudhamangla:ifbAgvkraul4n6IC@cluster0.mgrqz5r.mongodb.net/mydb?retryWrites=true&w=majority'


async function aggregateData(){
mongoose.connect(uri).then(() => console.log("DB connected"));

const userSchema = new mongoose.Schema({
    name:String,
    email:String
});

const orderSchema = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId,
    ref:'User'},
    product:String,
    price:Number,
    quantity:Number
})

const User = mongoose.model('Customer', userSchema);
const Order = mongoose.model("Order", orderSchema);

const result = await User.aggregate([
    { $lookup :{
        from:'orders',
        localField: '_id',
        foreignField: 'userId',
        as: 'orders'
    }},
    {
        $unwind : "$orders"
    },
    {
        $group: {
            _id: "$_id",
            totalOrderValue: {$sum : {$multiply: ["$orders.price", "$orders.quantity"]}}
        }
    }
]);

console.log(JSON.stringify(result, null, 2));
}

aggregateData();