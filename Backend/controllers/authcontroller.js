const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerUser = async (req,res)=>{

    try{
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message:"Please find all fields"
            });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message:"User already exists"
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({
            message:"User register successfully",
            user:{
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch(error){
        console.error(error);

        res.status(500).json({
            message:"Internal Server Error"
        });

    }

}

const loginUser = async(req,res)=>{
    try{
        const {email, password} =req.body;
        if(!email || !password){
            return res.status(400).json({
                message:"Please fill all fields"
            });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Invalid Email or password"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid Email or Password"
            })
        }
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }

        )
        return res.status(200).json({
            message:"Login Successfully",
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    }
    catch(error){
        console.error(error);

        res.status(500).json({
            message:"Internal Server Error"
        });
    }
};

const getProfile = async(req,res) =>{
    
    try{
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "Profile Fetched",
            user
        });

    }
    catch(error){
        console.error(error);

        return res.status(500).json({
            message:"Internal Server Error"
        })
    }





}

module.exports = { registerUser, loginUser,getProfile};