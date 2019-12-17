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
	let sql = 'SELECT * FROM Personnels where id='+id;
	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(rows);
	});
});

app.get('/getCompPersonnel', function(req, res) {
	id=req.query.id;
	let sql = 'SELECT C.libelles as libelle, CP.pourcentAcquis as niveau FROM Personnels P, Competences C, CompetencesPersonnels CP where P.id=CP.fk_id_personnel and fk_id_competence=C.id and P.id='+id;
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
	let sql1 = 'SELECT * FROM (Personnels inner join CompetencesPersonnels on Personnels.id=CompetencesPersonnels.fk_id_personnel) inner join Competences on Competences.id=CompetencesPersonnels.fk_id_competence Where Personnels.prenoms="Bernard"  ';
	let sql2='SELECT * FROM (Postes inner join FichePoste on Postes.id=FichePoste.fk_id_poste) inner join Competences on Competences.id=FichePoste.fk_id_competence ';
	
	id=req.query.id;
	let sql ='select * from Personnels where (select C.libelles from Personnels Pers, CompetencesPersonnels CP, Competences C where Pers.id=CP.fk_id_personnel and CP.fk_id_competence=C.id) in (select C.libelles from Postes P, FichePoste FP, Competences C where P.id=FP.fk_id_poste and fk_id_competence=C.id and P.libelle='+id+')';



	let test = 'select C.id, FP.pourcentage from Postes P, FichePoste FP, Competences C where P.id=FP.fk_id_poste and fk_id_competence=C.id and P.id='+id;
	let test2 = 'select P.id as idPers, C.id, CP.pourcentAcquis from Personnels P, CompetencesPersonnels CP, Competences C where P.id=CP.fk_id_personnel and CP.fk_id_competence=C.id';
	let results=[];
	db.all(test, [], (err, rows) => {
		if (err) {
			throw err;
		} 
		results.push(rows);
	});

	

	db.all(test2, [], (err, rows) => {
		if (err) {
			throw err;
		}
		results.push(rows);

		res.send(results);
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
