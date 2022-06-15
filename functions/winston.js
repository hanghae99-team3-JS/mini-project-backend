const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');

const { combine, timestamp, printf, colorize } = winston.format;

const logDir = 'logs';

const logFormat = printf((info) => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat
  ),
  transports: [
    new winstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/info',
      filename: `%DATE%.info.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
    new winstonDaily({
      level: 'warn',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/warn',
      filename: `%DATE%.warn.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error',
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

// Production 환경이 아닌 경우(dev 등) 배포 환경에서는 최대한 자원을 안잡아 먹는 로그를 출력해야함
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(
//     new winston.transports.Console({
//       format: combine(
//         colorize({ all: true }),
//         logFormat
//       ),
//     })
//   );
// }

module.exports = logger;
