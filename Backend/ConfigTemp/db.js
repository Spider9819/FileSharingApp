const moongose = require("mongoose");

const connectDB = async ()=>{
    try{

        await moongose.connect(process.env.MONGO_URL);

        console.log("MongoDB Connected Successfully");
        
    }
    catch(error){

        console.error("MongoDb Connection Failed:",error.message);
        process.exit(1);

    }
};

module.exports = connectDB;