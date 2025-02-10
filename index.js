import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 5000;
env.config();
const companyEmail = "markosouxlos@gmail.com"; // I need to change this with company's email
const db = new pg.Client({
	host: process.env.PG_HOST,
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	port: process.env.PG_PORT,
	database: process.env.PG_DATABASE
});

db.connect();
console.log(`Server has been succesfully connected with the database`);


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));








//fetch database tables
async function getFoods() {
	try {
		const results = await db.query(`
			SELECT FOODS.ID, FOODS.TITLE, FOODS.COMMENT, FOODS.PRICE, CATEGORIES.CAT_NAME
			FROM FOODS
			JOIN CATEGORIES
			ON FOODS.CATEGORY_ID = CATEGORIES.ID
			ORDER BY CATEGORIES.ID ;`);
		return results.rows;
	} catch (err) {
		console.log(err)
	}
}










//page handlers
app.get("/", (req, res) => {
	res.render('index.ejs');
});

app.get("/menu", (req,res) => {
	
	(async () => {
		const foods = await getFoods();
		res.render('menu.ejs', {
			title: "Menu",
			data: foods
		});
	})();
});

app.get("/about-us", (req,res) => {
	res.render('about-us.ejs', {title: "About Us"});
});

app.get("/gallery", (req,res) => {
	res.render('gallery.ejs', {title: "Gallery"});
});

app.get("/reservation", (req,res) => {
	res.render('reservation.ejs', {title: "Reservation", submited: false});
});










//form handler
app.post("/submit", (req,res) => {

	const data = {
		name: req.body.name,
		email: req.body.email,
		population: req.body.population,
		phone: req.body.phone,
		date: req.body.date,
		time: req.body.time,
		msg: req.body.msg,
	}

	console.log(data);

	// SMTP configuration
	const transporter = nodemailer.createTransport({
		service: 'gmail', 
		auth: {
			user: companyEmail,
			pass: 'optl tveg xhvb qoae',
		},
	});

	const mailOptions = {
		from: companyEmail,
		to: companyEmail, 
		subject: 'Κρατηση / Ερωτηση',
		text: `
Ονομα κρατησης: ${data.name}
Email: ${data.email}
Αριθμος ατομων: ${data.population}
Τηλεφωνο: ${data.phone}
Ωρα: ${data.time}
Ημερομηνια: ${data.date}
Μηνυμα: ${data.msg}`
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error('Error sending email:', error);
		} else {
			console.log('Email sent successfully:', info.response);
		}
	});

	res.render("reservation.ejs", {title: "Reservation", submited: true});

})




app.listen(port, '0.0.0.0', () => {
	console.log(`Server is up and running on port ${port}`);
});
