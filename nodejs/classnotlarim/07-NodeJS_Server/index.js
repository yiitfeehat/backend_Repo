"use strict"


console.log("fERHAT")

//' npm install dotenv

require("dotenv").config() //! .env dosytasındaki verileri process env içine yükleyebiliriz.

const PORT = process.env.PORT || 8000
const HOST = process.env.HOST || "127.0.0.1"
console.log(PORT, HOST)

const http = require("node:http") //? node un içerisinden http modulunu çağırdık

const app = http.createServer((req, res) => {

    console.log("----------")

    if (req.url == "/") {
        res.end(`<h1>WELCOME FS18</h1>`)

    } else if (req.url == "/blogs") {
        res.end(`<h1>BLOG SAYFASI</h1>`)
    } else if (req.url == "/newBlog") {
        res.end(`<h1>YENİ BLOG OLUŞTUR</h1>`)
    }

      
})

app.listen(PORT, () => console.log(`server running on : http://${HOST}:${PORT}`))

//belirtilen portu ve hostu dinel ve çalıştır.
