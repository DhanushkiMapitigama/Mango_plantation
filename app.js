const express = require('express')
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

const app = express()
const port = 3000

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', '*');
        return res.status(200);
    }

    next();
});

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/saveLocation', (req, res) => {
	try {
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			var dbo = db.db("mango_plantation");
			var myObj = {};
			dbo.collection("Locations").insertOne(myObj, function(err, res) {
				if (err) throw err;
				console.log("1 document inserted");
				db.close();
			});
		});
		res.send(200);
	} catch (e) {
		console.log(e);
        res.send(500);
	}	
});

app.get('/getData', (req, res) => {
	try {
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			var dbo = db.db("mango_plantation");
			dbo.collection("Locations").find({}).toArray(function(err, result) {
				if (err) throw err;
				res.send(result);
				db.close();
			});
		});
	} catch (e) {
		console.log(e);
        res.send(500);
	}	
});

app.listen(port, () => console.log(`Application listening on port ${port}!`));