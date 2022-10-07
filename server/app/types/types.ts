import { Request } from 'express';

export interface EnrinchedRequest extends Request{
    loggerClient: any
    session: any
    connections: any
}