var express = require('express');
var app = express();
var dateFormat = require('dateformat');

var sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./database.db');

app.use('/', express.static(__dirname + '/public/'));

app.use('/packages', express.static(__dirname + '/node_modules/'));

app.get('/competences', function(req, res) {
	let sql = 'SELECT libelle FROM Competences';
	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(rows);
	});
});

app.get('/personnels', function(req, res) {

	let sql = 'SELECT * FROM Personnels';
	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(rows);
	});
});

app.get('/getPersonnel', function(req, res) {
	id=req.query.id;
	let sql = 'SELECT * FROM Personnels P, Competences C, CompetencesPersonnels CP where P.id=CP.fk_id_personnel and  and P.id='+id;
	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(rows);
	});
});

app.get('/allPoste', function(req, res) {
	let sql = 'SELECT * FROM Postes';
	
	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(rows);
	});
});


app.get('/personnelsOK', function(req, res) {
	let sql = 'SELECT * FROM Personnels';
	
	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(rows);
	});
});

app.get('/posteOK', function(req, res) {
	let sql = 'SELECT * FROM Postes';
	
	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(rows);
	});
});

var port = 8080;
var server = app.listen(port, function(){
  console.log('listening on *:'+port);
});
