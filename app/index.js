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
  insertPeople();
  fs.writeFileSync(path.join('/tmp', 'app.started'), '');
});
