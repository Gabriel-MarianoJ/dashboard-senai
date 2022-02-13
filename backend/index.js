const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "machine_variables",
});

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/rotacao', (req, res) => {
    const sqlSelect = "SELECT id, rotacao, data_hora FROM tabela1 ORDER BY data_hora DESC LIMIT 600;";

    db.query(sqlSelect, (err, result) => {
        if (err) { console.log(err); }
        res.send(result);
    })
});
app.get('/api/avanco', (req, res) => {
    const sqlSelect = "SELECT id, avanco, data_hora FROM tabela1 ORDER BY data_hora DESC LIMIT 600;";

    db.query(sqlSelect, (err, result) => {
        if (err) { console.log(err); }
        res.send(result);
    })
});
app.get('/api/temperatura', (req, res) => {
    const sqlSelect = "SELECT id, temperatura, data_hora FROM tabela1 ORDER BY data_hora DESC LIMIT 20;";

    db.query(sqlSelect, (err, result) => {
        if (err) { console.log(err); }
        res.send(result);
    })
});

app.listen(3001, () => {
    console.log("running on port 3001");
})