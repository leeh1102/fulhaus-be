const express = require("express");
const app = express();
var http = require("http").Server(app);

const path = require("path");
const port = process.env.PORT || 8080;
const mongoose = require("mongoose")
const { postSchema, Post } = require("./post");
const posts = mongoose.model('posts', postSchema);
app.use(express.json());



app.listen(port, async (err) => {
    if (err) return console.loge(err);
    try {
        await mongoose.connect(
            "mongodb+srv://root:fulhausbe2023@fulhaus-be-hl.z460hq2.mongodb.net/?retryWrites=true&w=majority"
        );
    } catch (error) {
        console.log("db error");
    }
    console.log("Server running on port: ", port);
})