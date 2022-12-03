const fs = require('fs');

async function readFileSync (fileName) {
	return new Promise((resolve, reject) => {
		fs.readFile(fileName, (err, data) => {
			if (err) {
				reject(err);
			}
			resolve(data);
		});
	});
};

async function readStream(filename){
	return new Promise((resolve,reject) =>{
		var fileStream = fs.createReadStream(filename);
		fileStream.on('error', function(err) {
			if(err){
				reject(err);
			}
		});
		resolve(fileStream);
	})
}

async function writeFileSync (fileName, text) {
	return new Promise((resolve, reject) => {
		fs.open(fileName, 'w+', (err, fd) => {
			if (err) {
				reject(err);
			}
			fs.appendFile(fileName, text, (err, data) => {
				if (err) {
					reject(err);
				}
				resolve(data);
			});
		});
	});
};

module.exports = {
	readFileSync,
	writeFileSync,
	readStream
};
