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

