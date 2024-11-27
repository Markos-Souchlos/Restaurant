import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

const app = express();
const port = 3000;
const companyEmail = "markosouxlos@gmail.com";

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.render('index.ejs');
});

app.get("/menu", (req,res) => {
	res.render('menu.ejs', {title: "Menu"});
});

app.get("/about-us", (req,res) => {
	res.render('about-us.ejs', {title: "About Us"});
});

app.get("/gallery", (req,res) => {
	res.render('gallery.ejs', {title: "Gallery"});
});

app.get("/reservation", (req,res) => {
	res.render('reservation.ejs', {title: "Reservation"});
});


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
		text: `			 Ονομα κρατησης: ${data.name} 
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

	res.redirect("/reservation");

})

app.listen(port, () => {
	console.log(`Server is up and running on port ${port}`);
});
