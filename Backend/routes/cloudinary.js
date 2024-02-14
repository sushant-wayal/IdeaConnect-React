const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

cloudinary.config({ 
    cloud_name: 'divc1cuwa', 
    api_key: '329959632418894', 
    api_secret: 'Y_i-PzouMeCcNm4YSz88RcHZHn8',
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }
        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })
        console.log("file uploaded successfully",res.url);
        return res;
    }
    catch {
        fs.unlinkSync(localFilePath);
        return null;
    }
}

module.exports = uploadOnCloudinary;