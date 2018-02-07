import PDFDoc from 'pdfkit';
import fs from 'fs';
import Machine from '../models/machine.model';

const pathToPDF = __dirname + '/../ressources/pdf/';

//generate pdf
exports.generate = function(httpRes, compNameList) {

	var compList;

	if (compNameList) {
		compList = Machine.getSome(compNameList);
	} else {
		compList = Machine.getAll();
	}

	var doc = generateDoc(httpRes);

	/*
	compList is an array which should be composed of
	objects with the next format :
	{
		url: 'qrcode base64 value',
		name: 'machine name'
	}
	*/
	compList.forEach(comp => {
		addImage(doc, comp);
	})

	doc.end();
}

function addImage(doc, comp) {
	doc.image(comp.url, {
		align: 'center',
		valign: 'center'
	});
	doc.text(comp.name);
}

function generateDoc(httpRes) {
	var doc = new PDFDoc;

	doc.pipe(httpRes);
	//doc.pipe(fs.createWriteStream(pathToPDF + 'output.pdf'));

	return doc;
}
