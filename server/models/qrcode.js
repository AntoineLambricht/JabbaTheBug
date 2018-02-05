import QRCode from 'qrcode';
import imageURI from 'image-data-uri';

var generateUri = function(data) {
	QRCode.toDataURL(data)
		.then(url => {
			generateFile(data, url);
		})
		.catch(err => {
			console.error(err);
		})
}

var generateFile = function(data, url) {
	var filePath = __dirname + '/../ressources/qrcodes/' + data + '.png';
	imageURI.outputFile(url, filePath)
		.then(res => console.log(res))
		.catch(err => console.error(err));
}


module.exports = generateUri;
