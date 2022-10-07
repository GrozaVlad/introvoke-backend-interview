/**
 * Add your API server code here.
 *
 * See the README.md file at the root of this repository for instructions.
 */


import express from 'express';
import bodyParser from 'body-parser';
import routes from './app/routes';
import {initializeConnections} from './app/middlewares/intializeConnections';

const app = express()

app.use(bodyParser.json());
app.use(initializeConnections);
app.use('/',routes);
app.listen(process.env.PORT)


