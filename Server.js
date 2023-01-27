require("dotenv").config()

const express = require('express')
const jwt = require("jsonwebtoken")
const app = express()
const port = 3000

app.use(express.json())

const posts = [
    {
        username: "Abdul-Quayyum",
        title: "First Name"
    },
    {
        username: "Alao",
        title: "Last Name"
    }
]

app.get('/Names', authenticateKey, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

function authenticateKey(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))