// const express = require("express");
// const path = require("path");

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.static("project"));

// app.listen(port, () => console.info(`Server listening on port ${port}`));

var express = require("express");
var app = express();
const hostname = "127.0.0.1";
const port = 3000;
// app.get("/", (req, res) => {
//   res.status(200).send("Hello World!\n");
// });
app.use(express.static("project"));
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
