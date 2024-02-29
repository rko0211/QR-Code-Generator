import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import qr from "qr-image";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/styles.css", (req, res) => {
  res.sendFile(__dirname + "/public/styles.css");
});
app.get('/qr_img.png', (req, res) => {
  res.sendFile(__dirname + '/qr_img.png');
});
app.get('/facebook.avif', (req, res) => {
  res.sendFile(__dirname + "/public/facebook.avif");
});

app.get('/github.png', (req, res) => {
  res.sendFile(__dirname + "/public/github.png");
});
app.get('/Linkdin.webp', (req, res) => {
  res.sendFile(__dirname + "/public/Linkdin.webp");
});
app.get('/youtube.png', (req, res) => {
  res.sendFile(__dirname + "/public/youtube.png");
});
app.post("/submit", (req, res) => {
  const url = req.body.link; // Get the URL submitted from the form
  var qr_svg = qr.image(url);
  qr_svg.pipe(fs.createWriteStream("qr_img.png"));

  fs.writeFile("URL.txt", url, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });

  res.sendFile(__dirname + '/qr_img.png');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
