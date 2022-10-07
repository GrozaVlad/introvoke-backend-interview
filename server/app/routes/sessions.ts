import {delRedisCollectionData, setRedisCollectionData} from '../gateways/CacheGateway'
import {getUserIdentity} from '../services/userServices';
import {v4 as uuid} from 'uuid';
import {REDIS_SESSION_COLLECTION_NAME,REDIS_SESSION_TTL} from '../../constants';
import { Response } from 'express';
import {EnrinchedRequest} from '../types/types';

export async function createUserSession(req: EnrinchedRequest, res: Response) {
    const loggerClient=req.loggerClient;
    try{
        const {username, password} = req.body;
        const {redisClient} = req.connections;
        const {databasePool} = req.connections;

        // const result = await db.query('SELECT * FROM users WHERE username=$1 AND password=$2',[username,hashedPassword]);
        const result = await getUserIdentity(databasePool,username,password);
        if(result.rowCount){
            const sessionId = uuid();
            await setRedisCollectionData(redisClient,REDIS_SESSION_COLLECTION_NAME,REDIS_SESSION_TTL,sessionId,result.rows[0]);
            loggerClient.logMessage("createUserSession",true, "Session created successfully");
            return res.status(200).send(sessionId);
        } else {
            loggerClient.logMessage("createUserSession",false, "Session creation failed");
            return res.status(404).send('Not authorized');
        }
    }catch(error) {
        loggerClient.logMessage("createUserSession",false, "Session creation failed");
        return res.status(500).send("Something went wrong");
    }
}

export async function deleteUserSession(req: EnrinchedRequest, res: Response) {
    const loggerClient=req.loggerClient;
    try {
        const {redisClient} = req.connections
        const sessionID = req.headers.authorization.replace("Bearer ", "");
        await delRedisCollectionData(redisClient,REDIS_SESSION_COLLECTION_NAME,sessionID);
        loggerClient.logMessage("deleteUserSession",true, "Session deletion was successful");
        return res.status(200);
    } catch(error) {
        loggerClient.logMessage("deleteUserSession",false, "Session deletion failed");
        return res.status(500).send("Something went wrong");
    }
}