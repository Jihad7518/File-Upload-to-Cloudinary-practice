
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
