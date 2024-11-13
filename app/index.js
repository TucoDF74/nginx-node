const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const mysql = require('mysql')

const PORT = 3000;
const dbConfig = {
  host: 'db',
  user: 'root',
  database: 'nodedb'
}
const dbConnection = mysql.createConnection(dbConfig);

const initDb = function() {
  const query = `CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50) NOT NULL);`;
  dbConnection.query(query);
}

const insertPeople = function() {
  const query = `INSERT INTO people(name) VALUES ('tucodf74')`;
  dbConnection.query(query);
}

app.get('/', function (req, res) {
  const query = 'SELECT * FROM people';
  let html = '<h1>Full Cycle Rocks!</h1><ul>';
  dbConnection.query(query, function(_err, _result) {
    _result.forEach(people => {
      html += `<li>${people.id}: ${people.name}</li>`;
    });
    html += '</ul>';
    res.send(html);
  });
});

app.listen(PORT, function() {
  console.log(`O Servidor está rodando na porta ${PORT}`);
  initDb();
  insertPeople();
  fs.writeFileSync(path.join('/tmp', 'app.started'), '');
});
