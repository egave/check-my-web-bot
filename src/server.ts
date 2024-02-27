import { serve } from "http-server";
import { webhookCallback } from "npm:grammy";
import { bot } from "./bot.ts";
import { doTask } from "./tasks/index.ts";

const handleUpdate = webhookCallback(bot, "std/http");

serve(async (req: Request) => {
  if (req.method == "POST") {
    const url = new URL(req.url);
    if (url.pathname.slice(1) == bot.token) {
      try {
        console.debug("Received a new message !");
        return await handleUpdate(req);
      } catch (err) {
        console.error(err);
      }
    }
  }
  return new Response();
});

Deno.cron("Run every five minutes", "*/5 * * * *", () => {
    async function main() {
        console.debug('Executing CRON doTask()...')
        const result:string = await doTask();
        return result
    }
    main()
});