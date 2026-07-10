import pino from "pino";
import env from "./env";
const logger = pino({
    level:env.NODE_ENV==="production"?"info":"trace",
    transport:env.NODE_ENV!=="production"?
    {
        target:"pino-pretty",
        options:{
            colorsize:true,
            translateTime:"SYS:standard",
            ignore:"pid,hostname"
        }
    }
    : undefined
})

export default logger