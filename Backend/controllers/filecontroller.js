const File = require("../models/file");
const fs = require("fs");
const crypto = require("crypto");

const uploadFile = async(req,res)=>{
    try{    
        if(!req.file){
            return res.status(400).json({
                message:"Please upload a file"
            })
        }
        const newFile = new File({
            originalName: req.file.originalname,
            fileName: req.file.filename,    
            filePath: req.file.path,
            fileSize: req.file.size,
            uploadedBy: req.user.id
        });

        await newFile.save();

        return res.status(201).json({
            message:"File Uploaded Successfully",
            file:newFile
        });
    }
    catch(error){
        console.error(error);

        return res.status(500).json({
            message:"Internal Server Error"
        });

    }

};

const getmyfiles = async(req,res)=>{
    try{
        const files = await File.find({
            uploadedBy: req.user.id
        });

        return res.status(200).json(files);
    }
    catch(error){
          console.error(error);

          return res.status(500).json({
            message:"Internal Server Error"
          });
    }
}

const deleteFile = async(req,res)=>{
    try{
        const file = await File.findById(req.params.id);

        if(!file){
            return res.status(404).json({
                message:"File not Found"
            })
        }   

        if(file.uploadedBy.toString() !== req.user.id){
            return res.status(403).json({
                message:"You are not authorized to delete this file"
            });
        }               
        fs.unlinkSync(file,filePath);

        await file.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            message:"File deleted successfully"
        });

    }

    catch(error){
        console.error(error);

        return res.status(500).json({
            message:"Internal Server Error"
        });

    }

}

const downloadFile = async(req,res)=>{
    try{    

        const file = await File.findById(req.params.id);

        if(!file){
            return res.status(404).json({
                message:"File not Found"
            });
        }
        if(file.uploadedBy.toString() !== req.user.id){
            return res.status(403).json({
                message:"Not Authorized"
            });
        }
        return res.download(file.filePath, file.originalName);
    }
    catch(error)
    {
        console.error(error);

        return res.status(500).json({
            message:"Internal Server Error"
        });
    }
}

const shareFile = async(req,res)=>{
    try{
        const file = await File.findById(req.params.id);

        if(!file){  
            return res.status(404).json({
                message:"File not found"
            });
        }
        if(file.uploadedBy.toString() !== req.user.id){
            return res.status(403).json({
                message:"Not authorized"
            })
        }

    const token = crypto.randomBytes(16).toString("hex");

    file.shareToken = token;

    await file.save();

    return res.status(200).json({
        message:"Share Link Generated",
        link:`http://localhost:3000/api/files/share/${token}`
    });

    }
    catch(error){
        console.error(error);

        return res.status(500).json({
            message:"Internal Server Error"
        });
    }
}

const publicDownload = async(req,res)=>{
    try{

        const file = await File.findOne({
            shareToken:req.params.token
        });

        if(!file){
            return res.status(404).json({
                message:"Invalid Share Link"
            });
        }
        return res.download(file.filePath, file.originalName);

    }
    catch(error){
        console.error(error);

        return res.status(500).json({
            message:"Internal Server Error"
        });
    }
}


module.exports ={
    uploadFile,
    getmyfiles,
    deleteFile,
    downloadFile,
    shareFile,
    publicDownload
};