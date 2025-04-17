"use strict";

/* -------------------------------------------------------------------------- */
/*                              EXPRESS & ROUTING                             */
/* -------------------------------------------------------------------------- */

const express = require("express");
const multer = require("multer");
const app = express();

// Env
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

/* -------------------------------------------------------------------------- */
//* HTTP_METHODS & URLS:

app
  .route("/")
  .get((req, res) => res.send({ method: "GET" }))
  .post((req, res) => res.send({ method: "POST" }))
  .put((req, res) => res.send({ method: "PUT" }))
  .delete((req, res) => res.send({ method: "DELETE" }));

/* -------------------------------------------------------------------------- */
//* FILE UPLOAD (MULTER)

const upload = multer({ dest: "uploads/" });

app.get("/upload", (req, res) => {
  res.send(`
    <h2>Dosya Yükle</h2>
    <form action="/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="dosya" />
      <button type="submit">Yükle</button>
    </form>
  `);
});

app.post("/upload", upload.single("dosya"), (req, res) => {
  if (!req.file) return res.send("Dosya gelmedi bro 😕");
  res.send(`✅ Dosya yüklendi broo: ${req.file.originalname}`);
});

/* -------------------------------------------------------------------------- */

app.listen(PORT, () =>
  console.log(`Running at: http://127.0.0.1:${PORT}`)
);
