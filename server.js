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

app.post('/qualifie', function(req, res) {
	comp1 = req.body.comp1;
	comp2 = req.body.comp2;
	comp3 = req.body.comp3;
	val1=req.body.val1;
	val2=req.body.val2;
	val3=req.body.val3;

	requete=""

	if(comp1!=null){
		requete+="C.competence ="+comp1
	}
	if(comp2!=null){
		requete+=", and C.competence ="+comp2
	}
	if(comp3!=null){
		requete+=", and C.competence ="+comp3
	}
	if(val1!=null){
		requete+=", and CP.pourcentAcquis ="+val1
	}
	if(val2!=null){
		requete+=", and CP.pourcentAcquis ="+val2
	}
	if(val3!=null){
		requete+=", and CP.pourcentAcquis ="+val3
	}

	let sql = 'SELECT * FROM Personnels P, Competences C, CompetencesPersonnels CP where P.id=CP.fk_id_personnel and CP.fk_id_competence=C.id and '+requete;
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

