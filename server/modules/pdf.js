import PDFDoc from 'pdfkit';
import fs from 'fs';
import Machine from '../models/machine.model';

const pathToPDF = __dirname + '/../ressources/pdf/';

//generate pdf
var generate = function(httpRes, compNameList) {

	//fetch machines from the db based on the comp name list received 
	Machine.getSome(compNameList)
		.then(compList => fillPdf(httpRes, compList))
		.catch(err => {
			console.error(err);
		});

}

function fillPdf(httpRes, compList) {
	var doc = generateDoc(httpRes);

	/*
	compList is an array which should be composed of
	objects with the next format (at least those elements):
	{
		qrcode: 'qrcode base64 value',
		name: 'machine name'
	}
	*/

	doc
		.fontSize(25);

	var height = 50;
	var width = 50;
	var nElem = 0;

	compList.forEach(comp => {
		if (nElem % 4 === 0) {
			height = 50;
		}
		addImage(doc, comp, width, height, nElem);
		nElem++;
		height += 180;
	})

	doc.end();

}

function addImage(doc, comp, width, height, nElem) {
	if (nElem % 4 === 0 && nElem !== 0) {
		doc
			.addPage();
	}
	doc
		.image(comp.qrcode, width, height, {})
		.text(comp.name, width + 200, height + 50, {})
		.rect(width, height, 400, 130).stroke();
}

function generateDoc(httpRes) {
	var doc = new PDFDoc;

	doc.pipe(httpRes);
	//doc.pipe(fs.createWriteStream(pathToPDF + 'output.pdf'));

	return doc;
}

module.exports = generate;
