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
	let sql = 'SELECT * FROM (Personnels inner join CompetencesPersonnels on Personnels.id=CompetencesPersonnels.fk_id_personnel) inner join Competences on Competences.id=CompetencesPersonnels.fk_id_competence Where Personnels.prenoms="Bernard"  ';
	let sql2='SELECT * FROM (Postes inner join FichePoste on Postes.id=FichePoste.fk_id_poste) inner join Competences on Competences.id=FichePoste.fk_id_competence ';

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

var port = 8030;
var server = app.listen(port, function(){
  console.log('listening on *:'+port);
});
