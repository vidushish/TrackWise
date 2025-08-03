const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDb= async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected!");
    }catch(error){
        console.log("Database connection failed.");
        console.log("Error details:", error);
        process.exit(0);
    }
}

// require("./models/user");
// require("./models/task");
// require("./models/review");

module.exports = connectDb;