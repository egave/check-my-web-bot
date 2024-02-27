import { apiThrottler } from 'npm:@grammyjs/transformer-throttler'
import { Bot, session } from 'npm:grammy'
import { useFluent } from "npm:@grammyjs/fluent"
//import { freeStorage } from 'npm:@grammyjs/storage-free'
import { DenoKVAdapter } from "https://deno.land/x/grammy_storages/denokv/src/mod.ts";
import kv from './service/db.ts' 
import { fluent } from './utils/i18n.ts'
import { composer } from './composers/index.ts'
import { router as addRouter } from './routers/add.ts'
import { router as testRouter } from './routers/test.ts'
import type { SessionData } from './types/SessionData.ts'
import type { CustomContext } from './types/CustomContext.ts'

//const kv = await Deno.openKv();

// 1. Create a bot with a token
console.debug('Creating bot...');
export const bot = new Bot<CustomContext>(Deno.env.get("BOT_TOKEN") || '')

console.debug('Attaching fluent...');
bot.use(useFluent({
  fluent,
}));

// 2. Attach an api throttler transformer to the bot
console.debug('Attaching api throttlet...');
bot.api.config.use(apiThrottler())

// 3. Attach a session middleware and specify the initial data
console.debug('Attaching session...');
bot.use(
  session({
    initial: () => ({ 
      route: 'idle',
      urlToAdd: '',
      checkType: -1,
      sentence: '',
      urlData: [],
      count: 0 }),
    //storage: freeStorage<SessionData>(bot.token)
      storage: new DenoKVAdapter(kv)
  })
)

// 4. Attach all routers to the bot as middleware
console.debug('Attaching routers...');
bot.use(addRouter)
bot.use(testRouter)

// 5. Attach all composers to the bot as middleware
console.debug('Attaching composers...');
bot.use(composer)

// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.
bot.catch(error => console.error("Catched error: "+error));

// 6. Start the bot
//bot.start()
