import { Request, Response, NextFunction, json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { router } from './routes';


const express = require('express');

const app = express();

app.use(json());

app.use(cors());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error.'
    });
});


app.listen(3333, () => console.log('HTTP Server OK.'));
