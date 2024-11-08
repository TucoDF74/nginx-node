const express = require('express')
const app = express()
const config = {
    host: 'db',
    user: 'root',
    database: 'nodedb'
}
const mysql = require('mysql')
const connection = mysql.createConnection(config)
const sql = `INSERT INTO people(name) VALUES('tuco')`
connection.query(sql)
connection.end()

app.get('/', function (req, res) {
  res.send('Hello World')
})

console.log("Rodando na porta 3000")
app.listen(3000)
