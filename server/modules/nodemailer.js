import nodemailer from 'nodemailer';
import User from '../models/user.model.js';

// setup email data with unicode symbols
var mailOptions = {
	from: 'noreply-jabbathebug@tircher.be', // sender address
	to: '', // list of receivers
	subject: 'Notification from JabbaTheBug', // Subject line
	text: 'A new bug was added to the application' // plain text body
};

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
var buildMailServerAndSend = function() {
	//nodemailer.createTestAccount((err, account) => {

	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport({
		//host: 'smtp.ethereal.email',
		host: 'SSL0.OVH.NET',
		//port: 587,
		//secure: false, // true for 465, false for other ports
		auth: {
			user: 'noreply-jabbathebug@tircher.be', // generated ethereal user
			pass: 'jabbathebugultimatepassword123' // generated ethereal password
		}
	});

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
