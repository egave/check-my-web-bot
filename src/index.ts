import express from 'express'
import { webhookCallback } from 'grammy'
import { bot } from './bot'

//const app = App(express());
const app = express();

app.use(express.json())

app.post('/' + process.env.SECRET_PATH, webhookCallback(bot, 'express'))

// app.lib.cron((event: any) => {
//     return 'Hello Deta, I am a cron job';
// });

module.exports = app;
