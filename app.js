const http = require("http")
const https = require("https")
const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload')
const crypto = require("crypto");
const { Pool, Client } = require('pg')

const app = express();

global.routes = require('require-all')(path.join(__dirname, '/routes'));

const pool = new Pool({ ssl : { rejectUnauthorized : false} } );

global.pool = pool;
global.crypto = crypto;

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload())

app.use("/assets/css", express.static(path.join(__dirname, "assets/css")));
app.use("/assets/fonts", express.static(path.join(__dirname, "assets/fonts")));
app.use("/assets/img", express.static(path.join(__dirname, "assets/img")));
app.use("/assets/js", express.static(path.join(__dirname, "assets/js")));

app.use("/.well-known/acme-challenge", express.static(path.join(__dirname, "lets_encrypt")));

app.get("/", routes.home);
app.get("/register", routes.register);
app.get("*", routes.page_not_found);

app.post("/register", routes.register);
app.post("/mailbox", routes.mailbox);

const PORT = process.env.PORT;
app.listen(PORT);

https.createServer({
  key: fs.readFileSync(path.join(__dirname, "encryption/private.key")),
  cert: fs.readFileSync(path.join(__dirname, "encryption/certificate.crt")),
  ca: fs.readFileSync(path.join(__dirname, "encryption/ca_bundle.crt")),
}, app).listen(443);
