
//app create 
const express = require("express");
const app = express();

//find port 
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middleware
app.use(express.json());
//express file upload function
const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


//DB Connect
const db = require("./config/database");
db.dbConnect();


// cloud connect
const cloudinary = require("./config/cloudinary");
cloudinary.cloudConnect();


// api route mount
const Upload = require("./routes/FileUpLoad");
app.use("/api/v1/upload", Upload);


//server activate
app.listen(PORT, () => {
    console.log(`Server started successfully at Port no: ${PORT}`);
})

