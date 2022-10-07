import express from 'express';
import {getMessages,createMessage, updateMessage, deleteMessage, getMessage} from './messages';
import {createUserSession, deleteUserSession} from './sessions';
import createUser from './users';
import {isAuthorized} from '../middlewares/authorization'
import {validateSchema} from '../middlewares/validateSchema';
import {updateMessageSchema, getMessageSchema, deleteMessageSchema, createMessageSchema, createUserSessionSchema, createUserSchema} from './schemas';
const router = express.Router();

router.get(
    '/messages',
    isAuthorized,
    getMessages
);

router.post(
    '/messages',
    validateSchema(createMessageSchema),
    isAuthorized,
    createMessage
);

router.patch(
    '/messages/:messageId',
    validateSchema(updateMessageSchema),
    isAuthorized,
    updateMessage
);

router.delete(
    '/messages/:messageId',
    validateSchema(deleteMessageSchema),
    isAuthorized,
    deleteMessage
)

router.get(
    '/messages/:messageId',
    validateSchema(getMessageSchema),
    isAuthorized,
    getMessage
)

router.post(
    '/users',
    validateSchema(createUserSchema),
    isAuthorized,
    createUser
);

router.post(
    '/sessions',
    validateSchema(createUserSessionSchema),
    createUserSession
)

router.delete(
    '/sessions',
    deleteUserSession
)

export default router;