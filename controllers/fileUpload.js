
const { response } = require("express");
const File = require("../models/File");
const cloudinary = require("cloudinary").v2;


//local file upload handler create
exports.localFileUpload = async (req,res) => {
    try {
        //fetch file 
        const file = req.files.localImgFile;
        console.log("File is here: ", file);

        //create path and name file to save
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH ->: ", path);

        // add path to the move function
        file.mv(path, (err) => {
            console.log(err);
        });

        //create a success response
        res.json({
            success: true,
            message: "File Uploaded on Local Successfully",
        });


    } catch (error) {
        console.log("Sorrrrryyyyy!!! Not able to upload File");
        console.log(error);
    }
}


//file type support function
function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

// file uploading to cloudinary function
async function fileUploadToCloudinary(file, folder, quality){
    const options = {folder};
    if(quality){
        options.quality = quality;
    }

    options.resource_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}


// image upload to cloudinary handler 
exports.imageUpload = async (req,res) => {
    try {
        //fetch data 
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.ImgUploadCloud;
        console.log("File: ", file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type is : ", fileType);

        // if file type is not supported
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "Sorry!! File type is not supported!!",
            });
        }

        // if file formate supported then
        const response = await fileUploadToCloudinary(file, "FileUploadProject");
        console.log(response);

        //now set entry to database
        const fileData = await File.create({
            name,
            email,
            tags,
            imageUrl: response.secure_url,
        });

        // sent a successfull response
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully uploaded",
        });

    } catch (error) {
        console.log(error);
        console.log("Sorrrrryyyyy!!! Not able to upload File");
        console.log(error);
    }
}


