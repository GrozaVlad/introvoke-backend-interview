
import { AnyZodObject } from 'zod';
import { Response, NextFunction } from 'express';
import {EnrinchedRequest} from '../types/types';

export const validateSchema =
  (schema: AnyZodObject) =>
  async (req: EnrinchedRequest, res: Response, next: NextFunction) => {
    const loggerClient=req.loggerClient;
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      loggerClient.logMessage("isAuthorized",false, "Validation failed");
      return res.status(400).json(error);
    }
};