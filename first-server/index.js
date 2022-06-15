const http = require("http");
//require is synchronous and import is asyncronous

const hostname = "localhost";
const port = 3000;

// const server = http.createServer((req, res) => {
// });
// req is
const server = http.createServer((req, res) => {
    // console.log(req);

    const { url } = req;

    console.log(url);

    if (url === "/translations") {
        const translations = { 1: "one", 2: "two", 3: "three" };
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(translations));
        res.end();
        // res.end("tranlsations");
    }

    res.end("Welcome to Node1@!");
});

server.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}`);
});
//nodemon npm packaage(see pacakage.json) makes it so that when you save
//code it automatically stops and starts a new server on localhost
//continue to use 'npm run dev' as usual since nodemon is installed
