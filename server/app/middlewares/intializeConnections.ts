import Redis from 'ioredis';
import {LoggerClient} from '../services/loggerService';
import {MongoClient} from 'mongodb';
import {DatabasePool} from '../gateways/DatabaseGateway';
import {MONGO_LOGS_DB_NAME, MONGO_LOGS_COLLECTION} from '../../constants';
import { Response, NextFunction } from 'express';
import {EnrinchedRequest} from '../types/types';

export async function initializeConnections(req: EnrinchedRequest, res: Response, next: NextFunction){
    let redisClient, logsCollection;

    try{
        redisClient = new Redis({
            port: 6379, // Redis port
            host: "sequel_caching", // Redis host
            password: "redispass",
            db: 0, // Defaults to 0
        });
    } catch(error){
        console.log(error);
        res.status(503).send("Something went wrong");
    }
    const databasePool = new DatabasePool();
    try {
        console.log("Start the mongo process")
        const url = 'mongodb://root:example@mongo:27017';
        const mongoClient = new MongoClient(url);
        await mongoClient.connect();
        console.log('Connected successfully to server');
        const db = mongoClient.db(MONGO_LOGS_DB_NAME);
        logsCollection = db.collection(MONGO_LOGS_COLLECTION);
    } catch(error) {
        console.log(error);
    }
    
    const loggerClient = new LoggerClient(logsCollection);
    
    req.connections = {redisClient, databasePool}
    req.loggerClient = loggerClient;
    next();
}