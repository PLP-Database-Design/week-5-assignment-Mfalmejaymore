require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const app = express();

// for making the page look good
const mycss = require('./styler');

/*
too many errors, decided to just use the direct connection
const conn = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
});
*/

// initiate connection

const conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'hospital_db',
});

conn.connect(err => {
	if(err) throw err;
	console.log('connection successful');
});


// default page
	app.get('',(req,res) => {
		res.setHeader('Content-type','text/html');
		res.end(`
			${mycss}
			<h2>website menu</h2>
			<div class="lister">
				<b>use these commands to get data</b>
				<ul>
					<li><a href="/showpatients">show patients</a></li>
					<li><a href="/showproviders">show providers</a></li>
					<li><a href="/showpatients_byname">show patients by first name</a></li>
					<li><a href="/showproviders_byspec">show providers by specialty</a></li>
				</ul>
			</div>
		`);
	})

// Question 1 goes here
	app.get('/showpatients', (req,response) => {
		response.setHeader('Content-type','text/html');

		let thequery = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients";

		conn.query(thequery,(err,res) => {
			if(err) throw err;

			let output = `
			<table>
				<tr class="toprow">
					<th>patient_id</th>
					<th>first_name</th>
					<th>last_name</th>
					<th>date_of_birth</th>
				</tr>`
			;

			console.log(res);

			res.forEach((el,id) => {
				let tempdata = `<tr>`;

				tempdata += `<td>${el.patient_id}</td>`;
				tempdata += `<td>${el.first_name}</td>`;
				tempdata += `<td>${el.last_name}</td>`;
				tempdata += `<td>${el.date_of_birth}</td>`;

				tempdata += `</tr>`;

				output += tempdata;
			})

			let finalhtml = generateHTML('showing patients',res,output);

			response.end(`
				${finalhtml}
			`);
		});
	});


// Question 2 goes here
	app.get('/showproviders', (req,response) => {
		response.setHeader('Content-type','text/html');

		let thequery = "SELECT first_name, last_name, provider_specialty FROM providers";

		conn.query(thequery,(err,res) => {
			if(err) throw err;

			let output = `
			<table>
				<tr class="toprow">
					<th>first_name</th>
					<th>last_name</th>
					<th>provider_specialty</th>
				</tr>`
			;

			console.log(res);

			res.forEach((record,id) => {
				let tempdata = `<tr>`;

				tempdata += `<td>${record.first_name}</td>`;
				tempdata += `<td>${record.last_name}</td>`;
				tempdata += `<td>${record.provider_specialty}</td>`;

				tempdata += `</tr>`;

				output += tempdata;
			})

			let finalhtml = generateHTML('showing providers',res,output);

			response.end(`
				${finalhtml}
			`);
		});
	});

// Question 3 goes here
	app.get('/showpatients_byname', (req,response) => {
		response.setHeader('Content-type','text/html');

		let thequery = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients ORDER BY first_name ASC";

		conn.query(thequery,(err,res) => {
			if(err) throw err;

			let output = `
			<table>
				<tr class="toprow">
					<th>patient_id</th>
					<th>first_name</th>
					<th>last_name</th>
					<th>date_of_birth</th>
				</tr>`
			;

			console.log(res);

			res.forEach((el,id) => {
				let tempdata = `<tr>`;

				tempdata += `<td>${el.patient_id}</td>`;
				tempdata += `<td>${el.first_name}</td>`;
				tempdata += `<td>${el.last_name}</td>`;
				tempdata += `<td>${el.date_of_birth}</td>`;

				tempdata += `</tr>`;

				output += tempdata;
			})

			let finalhtml = generateHTML('showing patients (ordered by first name)',res,output);

			response.end(`
				${finalhtml}
			`);
		});
	});

// Question 4 goes here
	app.get('/showproviders_byspec', (req,response) => {
		response.setHeader('Content-type','text/html');

		let thequery = "SELECT first_name, last_name, provider_specialty FROM providers ORDER BY provider_specialty ASC";

		conn.query(thequery,(err,res) => {
			if(err) throw err;

			let output = `
			<table>
				<tr class="toprow">
					<th>first_name</th>
					<th>last_name</th>
					<th>provider_specialty</th>
				</tr>`
			;

			console.log(res);

			res.forEach((record,id) => {
				let tempdata = `<tr>`;

				tempdata += `<td>${record.first_name}</td>`;
				tempdata += `<td>${record.last_name}</td>`;
				tempdata += `<td>${record.provider_specialty}</td>`;

				tempdata += `</tr>`;

				output += tempdata;
			})

			let finalhtml = generateHTML('showing providers (ordered by specialty)',res,output);

			response.end(`
				${finalhtml}
			`);
		});
	});

// utility functions

function generateHTML(heading,theitems,output) {
	return `
		${mycss}
		<a class="topbtn" href="javascript:history.back()">go back</a>
		<h2>${heading}</h2>
		<p>found <b>${theitems.length}</b> records</p>
		${output};
	`;
}

// listen to the server
const PORT = 3000;

app.listen(PORT, () => {
	console.log(`server is runnig on http://localhost:${PORT}`)
})