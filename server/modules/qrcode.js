import QRCode from 'qrcode';
import imageURI from 'image-data-uri';

//generate base64 image from data and sends it to the callback function
var generateUri = function(data, callback) {
	return new Promise((resolve, reject) => {
		QRCode.toDataURL(data)
			.then(url => {
				resolve(url);
			})
			.catch(err => {
				reject(err);
			})
	});
}

//not used, letting it just in case
var generateFile = function(data, url) {
	var filePath = __dirname + '/../ressources/qrcodes/' + data + '.png';
	imageURI.outputFile(url, filePath)
		.then(res => console.log(res))
		.catch(err => console.error(err));
}


module.exports = generateUri;
