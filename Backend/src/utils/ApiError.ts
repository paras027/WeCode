import logger from "../config/logger";

class ApiError extends Error{
    statusCode: number;

    constructor(statusCode:number,message:string){
        logger.error(message)
        super(message);
        this.statusCode = statusCode;
    }
}

export default ApiError;