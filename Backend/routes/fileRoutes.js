const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadmiddleware");
const {protect} = require("../middleware/authmiddleware");
const {uploadFile,getmyfiles,deleteFile,downloadFile,shareFile,publicDownload} = require("../controllers/filecontroller");


router.post(
    "/upload",
    protect,
    upload.single("file"),
    uploadFile
)   

router.get(
    "/myfiles",
    protect,
    getmyfiles
)

router.delete(
    "/:id",
    protect,
    deleteFile
)
router.get(
    "/download/:id",
    protect,
    downloadFile
)

router.post(
    "/share/:id",
    protect,
    shareFile
);

router.get(
    "/share/:token",
    publicDownload
);


module.exports = router;