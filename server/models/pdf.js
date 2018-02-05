import PDFDoc from 'pdfkit';
import fs from 'fs';

const pathToPDF = __dirname + '/../ressources/pdf/';
const pathToQrCodes = __dirname + '/../ressources/qrcodes/';

//generate the pdf with all the qrcodes
exports.generateAll = function() {
	var doc = generateDoc();

	fs.readdir(pathToQrCodes, (err, files) => {

		files.forEach(file => {
			addImage(doc, file);
		})

		console.log('done');
		doc.end();

		if (err) console.error(err);
	});
}

//generate the pdf with only some qrcodes
exports.generateSome = function(compList) {

}

function addImage(doc, file) {
	doc.image(pathToQrCodes + file, {
		align: 'center',
		valign: 'center'
	});
	doc.text(file);
}

function generateDoc() {
	var doc = new PDFDoc;

	doc.pipe(fs.createWriteStream(pathToPDF + 'output.pdf'));

	return doc;
}
