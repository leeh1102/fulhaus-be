const express = require("express");
const app = express();
var http = require("http").Server(app);

const path = require("path");
const port = process.env.PORT || 8080;
const mongoose = require("mongoose")
const { postSchema, Post } = require("./post");
const posts = mongoose.model('posts', postSchema);
app.use(express.json());

// TODO: Error Handling 

// GET /acronym?page=1&limit=10&search=:search 
// returns a list of acronyms, pagination using query parameters, response headers indicate if there are more results, 
// and returns all acronyms that fuzzy match against: search

app.get("/acronym", async (req, res) => {
    if (req.query._id && req.query._id !== "") {
        const result = await posts.find({ _id: req.query._id });
        res.status(200).json(result);
    } else if (req.query.search && req.query.search !== "") {
        const result = await posts.find({ acronym: { $regex: req.query.search, $options: "i" } });
        res.status(200).json(result);
    } else {
        const result = await posts.find();
        res.status(200).json(result);
    }
})

// POST /acronym - receives an acronym and definition string & adds the acronym definition to the db
app.post("/acronym/", async (req, res) => {
    const acronym = req.body.acronym;
    const definition = req.body.definition;
    const newpost = new posts({ acronym: acronym, definition: definition });
    const result = await newpost.save();
    res.status(201).json({ "status": "success", "message": "post created" });
})



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