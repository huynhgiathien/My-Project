const fs = require('fs').promises;
const path = require('path')
const {format} = require('date-fns')
const filename = path.join(__dirname, '../Logs', 'logs.log')
const logEvents = async (msg) =>{
    try{
        const datetime = `${format(new Date(), `dd-MM-yyyy\tss:mm:HH`)}`
        const contentLog = `${datetime}--------------${msg}\n`
        fs.appendFile(filename, contentLog)
    }
    catch(error)
    {
        console.log(error)
    }
}

module.exports =   logEvents
