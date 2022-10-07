import {getRedisCollectionData} from '../gateways/CacheGateway';
import {REDIS_SESSION_COLLECTION_NAME} from '../../constants';
import { Response, NextFunction } from 'express';
import {EnrinchedRequest} from '../types/types';

export async function isAuthorized(req: EnrinchedRequest, res: Response, next: NextFunction){
    const loggerClient=req.loggerClient;
    try{
        if(!req.headers.authorization){
            loggerClient.logMessage("isAuthorized",false, "Authorization middleware, not authorized");
            res.status(403).send("Not authorized");
        }
        const {redisClient} = req.connections
        const sessionID = req.headers.authorization.replace("Bearer ", "");
        const userSession = await getRedisCollectionData(redisClient,REDIS_SESSION_COLLECTION_NAME, sessionID)
        if(!userSession){
            loggerClient.logMessage("isAuthorized",false, "Authorization middleware, not authorized");
            res.status(403).send("Not authorized");
        }
        req.session = userSession;
        next();
    } catch(error) {
        loggerClient.logMessage("isAuthorized",false, "Authorization middleware failed");
        return res.status(500).send("Something went wrong");
    }
}
