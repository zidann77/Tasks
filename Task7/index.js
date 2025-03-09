const express = require("express")
const app = express()
const mysql = require("mysql2")
const { urlencoded } = require("body-parser")
const dotenv = require("dotenv")

dotenv.config()
app.use(urlencoded({ extended: true }))

const pool = mysql.createPool({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    database: process.env.DATABASE
}).promise()

app.post("/scores", async (req, res) => {
    try {
        const { player, score } = req.body
        if (!player || !score) return res.status(400).send({ message: "Missing player or score" })
        await pool.execute("INSERT INTO scores (player, score) VALUES (?, ?)", [player, score])
        res.status(201).send({ message: "Score submitted" })
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

app.get("/scores", async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT * FROM scores ORDER BY score DESC")
        if (rows.length === 0) return res.status(404).send({ message: "No scores found" })
        res.status(200).send(rows)
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

app.delete("/scores/:id", async (req, res) => {
    try {
        const result = await pool.execute("DELETE FROM scores WHERE id = ?", [req.params.id])
        if (result[0].affectedRows === 0) return res.status(404).send({ message: "Score not found" })
        res.status(200).send({ message: "Score deleted" })
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

const port = 3000
app.listen(port, () => {
    console.log("Server running on port: " + port)
})
