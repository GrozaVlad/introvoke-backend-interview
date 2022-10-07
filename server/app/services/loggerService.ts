import pino from "pino";
import type { Logger } from "pino";


export class LoggerClient{
    logsCollection;

    constructor(logsCollection: any){
        this.logsCollection = logsCollection;
    }

    async logMessage(method: string,success: boolean, message: string ) {
        const logger: Logger = pino();
        await this.logsCollection.insertOne({method,success,message})
        const child = logger.child({method, success})
        child.info(message);
    }
}