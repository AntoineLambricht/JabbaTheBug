import PDFDoc from 'pdfkit';
import fs from 'fs';

const pathToPDF = __dirname + '/../ressources/pdf/';

//generate the pdf with all the qrcodes
exports.generateAll = function() {
	//var doc = generateDoc();

	fs.readdir(pathToPDF, (err, files) => {
		console.log('fichiers');
		files.forEach(file => {
			console.log(file);
		});

		if (err) console.error(err);
	});
}

//generate the pdf with only some qrcodes
exports.generateSome = function(compList) {

}

function generateDoc() {
	var doc = new PDFDoc;

	//doc.pipe fs.createWriteStream(__dirname + '/../ressources/pdf/output.pdf');

}
