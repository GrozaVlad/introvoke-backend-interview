import {getAllDatabaseMessages,getDatabaseMessage, updateDatabaseMessage, deleteDatabaseMessage, createDatabaseMessage} from '../services/messageServices';
import { Response } from 'express';
import {EnrinchedRequest} from '../types/types';

export async function getMessages (req: EnrinchedRequest, res: Response) {
    const loggerClient=req.loggerClient;
    try{
        const {user_id} = req.session;
        const {databasePool} = req.connections;
        const result = await getAllDatabaseMessages(databasePool,user_id);

        if(result.rowCount){
            res.status(200).send(result.rows);
            loggerClient.logMessage("getMessages",true, "Succesfully retrieved messages");
        } else {
            res.status(404).send("Not found");
            loggerClient.logMessage("getMessages",false, "Messages not found")
        }
    } catch (error) {
        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message

        loggerClient.logMessage("getMessages",false, message)
        res.status(500).send("Something went wrong");
    }
}

export async function getMessage(req: EnrinchedRequest, res: Response) {
    const loggerClient=req.loggerClient;
    try {
    const {messageId} = req.params;
    const {user_id} = req.session;
    const {databasePool} = req.connections;
    const result = await getDatabaseMessage(databasePool,user_id,messageId);
        if(result.rowCount) {
            loggerClient.logMessage("getMessages",true, "Succesfully retrieved the message");
            res.status(200).send(result.rows[0]);
            } else {
            loggerClient.logMessage("getMessages",false, "Messages not found")
            res.status(404).send("Not found");
        }
    } catch (error) {
        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message

        loggerClient.logMessage("getMessage",false, message)
        res.status(500).send("Something went wrong");
    }
}

export async function updateMessage(req: EnrinchedRequest, res: Response){
    const loggerClient=req.loggerClient;
    try{
        const {messageId} = req.params;
        const {message} = req.body;
        const {user_id} = req.session;
        const {databasePool} = req.connections;
        const result = await updateDatabaseMessage(databasePool,message,user_id,messageId);
        if(result.rowCount) {
            loggerClient.logMessage("updateMessage",true, "Succesfully updated the message");
            res.status(200).json({success: true});
        } else {
            loggerClient.logMessage("updateMessage",false, "Message not updated")
            res.status(404).send("Not found");
        }
    } catch(error) {
        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message

        loggerClient.logMessage("updateMessage",false, message)
        res.status(500).send("Something went wrong");
    }
}

export async function deleteMessage(req: EnrinchedRequest, res: Response){
    const loggerClient=req.loggerClient;
    try{
        const {messageId} = req.params;
        const {user_id} = req.session;
        const {databasePool} = req.connections;

        const result = await deleteDatabaseMessage(databasePool,messageId,user_id);
        if(result.rowCount){
            loggerClient.logMessage("deleteMessage",true, "Message deleted successfully");
            res.status(200).json({success:true});
        } else {
            loggerClient.logMessage("deleteMessage",false, "Message couldn't be deleted");
            res.status(404).send("Not found");
        }
    } catch(error) {
        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message

        loggerClient.logMessage("deleteMessage",false, message)
        res.status(500).send("Something went wrong");
    }
}

export async function createMessage(req: EnrinchedRequest, res: Response){
    const loggerClient=req.loggerClient;
    try{
        const {message} = req.body;
        const {user_id} = req.session;
        const {databasePool} = req.connections;

        await createDatabaseMessage(databasePool,message,user_id);
        loggerClient.logMessage("createMessage",true, "Message created successfully");
        res.status(200).json({success:true});
    } catch(error) {
        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message

        loggerClient.logMessage("createMessage",false, message)
        res.status(500).send("Something went wrong");
    }
}