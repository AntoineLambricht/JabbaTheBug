import QRCode from 'qrcode';
import imageURI from 'image-data-uri';

//generate base64 image from data and sends it to the callback function
var generateUri = function(machine, callback) {
	QRCode.toDataURL('jabbathebug://' + machine.name)
		.then(url => {
			callback(url);
		})
		.catch(err => {
			console.error(err);
		})
}

//not used, letting it just in case
var generateFile = function(data, url) {
	var filePath = __dirname + '/../ressources/qrcodes/' + data + '.png';
	imageURI.outputFile(url, filePath)
		.then(res => console.log(res))
		.catch(err => console.error(err));
}


module.exports = generateUri;
