import {createNewBasicUser} from '../services/userServices';
import { Request, Response } from 'express';
import {EnrinchedRequest} from '../types/types';

async function createUser(req: EnrinchedRequest, res: Response) {
    const loggerClient=req.loggerClient;
    try{
        const {username,password} = req.body;
        const {role} = req.session;
        const {databasePool} = req.connections;

        if(role === 'ADMIN'){
            await createNewBasicUser(databasePool,username,password);
            // await db.query('INSERT INTO users (user_id, role, password, username) VALUES ($1, $2, $3, $4)',[userId, 'USER', hashedPassword, username]);
        } else {
            loggerClient.logMessage("createUser",false, "User creation failed");
            res.status(401).json({message: 'Not authorized'});
        }
        loggerClient.logMessage("createUser",false, "User creation was successful");
        res.status(200).json({success:true});
    } catch(error) {
        loggerClient.logMessage("createUser",false, "User creation failed");
        return res.status(500).send("Something went wrong");
    }
}

export default createUser;