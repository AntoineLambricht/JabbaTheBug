import nodemailer from 'nodemailer';
import User from '../models/user.model.js';

// setup email data
var mailOptions = {
	from: 'noreply-jabbathebug@tircher.be', // sender address
	to: '', // list of receivers
	subject: 'Notification from JabbaTheBug' // Subject line
};

//function that creates and sends an email with the 'data' parameter
var buildMailServerAndSend = function(data) {
	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport({
		host: 'SSL0.OVH.NET',
		auth: {
			user: 'noreply-jabbathebug@tircher.be',
			pass: 'jabbathebugultimatepassword123'
		}
	});

	//if no html structured content is given to the function sends a default content
	if (data) {
		mailOptions.html = data;
	} else {
		mailOptions.html = '<p>A new bug was added to the application</p>';
	}

	//sends email to all admin in the database
	User.getAll()
		.then(users => {
			let contactMails = '';
			users.forEach(user => {
				contactMails += user.mail + ',';
			})
			contactMails = contactMails.slice(0, -1);
			mailOptions.to = contactMails;
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					return console.log(error);
				}
			});
		})
		.catch(err => {
			console.error(err);
		})
}

module.exports = buildMailServerAndSend;
