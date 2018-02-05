import PDFDoc from 'pdfkit';
import fs from 'fs';
import db from './db'

const pathToPDF = __dirname + '/../ressources/pdf/';

//generate the pdf with all the qrcodes
exports.generateAll = function() {

	var machines = db.getAllMachines();

	exports.generateSome(machines);

}

//generate the pdf with only some qrcodes
exports.generateSome = function(compList) {

	var doc = generateDoc();

	compList.forEach(comp => {
		addImage(doc, comp);
	})

	console.log('done writing pdf file');
	doc.end();
}

function addImage(doc, comp) {
	doc.image(comp.url, {
		align: 'center',
		valign: 'center'
	});
	doc.text(comp.name);
}

function generateDoc() {
	var doc = new PDFDoc;

	doc.pipe(fs.createWriteStream(pathToPDF + 'output.pdf'));

	return doc;
}
