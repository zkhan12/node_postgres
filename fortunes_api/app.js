// fs is filesystem module
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const fortunes = require("./data/fortunes");

const app = express();

app.use(bodyParser.json());

//get has 2 params, first one is the endpoint, second is callback function
app.get("/fortunes", (req, res) => {
    // console.log("requesting fortunes");
    // res.send("requesting fortunes");
    res.json(fortunes);
});

app.get("/fortunes/random", (req, res) => {
    console.log("requesting random fortune");
    const random_index = Math.floor(Math.random() * fortunes.length);
    const r_fortune = fortunes[random_index];
    res.json(r_fortune);
});

app.get("/fortunes/:id", (req, res) => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    // console.log(req.params.id);
    res.json(fortunes.find((f) => f.id == req.params.id));
});

const writeFile = (json) => {
    fs.writeFile("./data/fortunes.json", JSON.stringify(json), (err) => console.log(err));
};

app.post("/fortunes", (req, res) => {
    // console.log(req.body);
    const { message, lucky_number, spirit_animal } = req.body;
    const fortune_ids = fortunes.map((f) => f.id);
    // look into ternary expressions for id assignment, ? is then(assuming if is true), : is else
    // need to use spread operator ... to pass an array into math.max

    const new_fortunes = fortunes.concat({
        id: (fortune_ids.length > 0 ? Math.max(...fortune_ids) : 0) + 1,
        message,
        lucky_number,
        spirit_animal,
    });

    writeFile(new_fortunes);

    res.json(new_fortunes);
});

app.put("/fortunes/:id", (req, res) => {
    const { id } = req.params;
    const { message, lucky_number, spirit_animal } = req.body;

    //find returns a reference to the original element, so fortunes is mutable
    const old_fortune = fortunes.find((f) => f.id == id);

    ["message", "lucky_number", "spirit_animal"].forEach((key) => {
        if (req.body[key]) old_fortune[key] = req.body[key];
    });

    writeFile(fortunes);

    res.json(fortunes);
});

app.delete("/fortunes/:id", (req, res) => {
    const { id } = req.params;

    const new_fortunes = fortunes.filter((f) => f.id != id);

    writeFile(new_fortunes);

    res.json(new_fortunes);
});

// bin/www file specifically takes care of starting up the app
// this file takes care of generating the app and its components
module.exports = app;
