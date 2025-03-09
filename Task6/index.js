
const express = require("express");
const mysql = require("mysql2");
const app = express();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Taskdb"
});

connection.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database!");
});

app.get("/users/:id", (req, res) => {
    const paramsId = req.params.id;

    connection.query("SELECT * FROM users WHERE id = ?", [paramsId], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Database query error" });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.json(results[0]);
    });
});

const port = 3000;
app.listen(port, () => {
    console.log("Server running at Port: "+port);
});
