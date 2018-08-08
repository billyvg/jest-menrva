const fs = require("fs");
const request = require("request");

const FILE = "./alert-link-renders-with-icon.png";
const FILE2 = "./alert-link-renders-with-icon2.png";
var req = request.post("http://localhost:3000/build/build-id/upload", function(
  err,
  resp,
  body
) {
  if (err) {
    console.log("Error!");
  } else {
    console.log("URL: " + body);
  }
});
var form = req.form();
form.append("file", fs.createReadStream(FILE), {
  filename: FILE
});
form.append("file", fs.createReadStream(FILE2), {
  filename: FILE2
});
form.append("test", "test test");
