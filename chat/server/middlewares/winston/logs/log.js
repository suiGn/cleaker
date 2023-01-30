const winston = require('winston');
var path = require('path');

const logger = winston.createLogger({
	format: winston.format.json(),
	transports: [
		new winston.transports.File({
			filename: path.join(__dirname, '../log/log.txt')
		})
	]
});

module.exports = { logger };
