const mongoose = require("mongoose");

const fileScheme = new mongoose.Schema(
    {
        originalName:{
            type: String,
            required: true
        },
        fileName:{
            type: String,
            required: true
        },
        filePath:{
            type:String,
            required: true
        },
        fileSize:{
            type: Number,
            required: true
        },
        uploadedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
        },
        shareToken:{
            type:"String",
            default: null
        }
    },
    {
        timestamps: true
    }
);

const File = mongoose.model("File",fileScheme);
module.exports = File;





