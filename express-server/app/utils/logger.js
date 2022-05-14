// 日志工具
const {createLogger, format, transports} = require('winston');
const myFormat = format.printf(log => {
    return `${log.timestamp} ${log.level}: ${log.message}`;
})
const logger = createLogger({
    // 日志输出级别： info < warn < error
    level: 'info',
    // 日志输出的格式
    format: format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        myFormat
    ),
    // 输出日志的文件名与其位置
    transports: [ 
        new transports.Console(),
        new transports.File({filename: './logs/applog.log'})
    ]
})
export default logger