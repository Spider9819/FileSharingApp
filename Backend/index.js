const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");

const connectDB = require("./config/db");

dotenv.config();    

connectDB();

const app= express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/files",fileRoutes)

app.get("/",(req,res)=>{
    res.send("File sharing API is Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})