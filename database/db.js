require("dotenv/config");
const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true
        });
        console.log("mongoodb connected...");
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;