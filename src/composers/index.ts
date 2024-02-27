import { Composer, InlineKeyboard } from 'npm:grammy'
import type { CustomContext } from '../types/CustomContext.ts'
import { UrlData } from '../types/UrlData.ts'
import handleDonate from '../commands/handleDonate.ts'
import { SETTINGS } from '../config.ts'
import { getListURL } from '../utils/getListURL.ts'
import { doTask } from '../tasks/index.ts'

const composer = new Composer<CustomContext>()
console.debug('Creating composer...')

composer.command('start', async ctx => {
    console.debug('** command /start')
    await ctx.reply(ctx.t('start', {
        name: ctx.from?ctx.from.first_name:'inconnu'
      }));
})

composer.command('help', async ctx => {
    console.debug('** command /help')
    await ctx.reply(ctx.t('help'));
})

composer.command('list', async ctx => {
    console.debug('** command /list')
// Send a message to the user with the list of currently monitored URLs
if (ctx.session.urlData === undefined || ctx.session.urlData.length === 0)
    await ctx.reply(ctx.t('empty-list'))
else
    await ctx.reply(getListURL(ctx.session.urlData), {
        link_preview_options : { is_disabled: true } 
    });
})

composer.command('add', async ctx => {
    // Check if the maximum number (SETTINGS.MAX_URL) of allowed URLs is reached
    if (ctx.session.urlData.length >= SETTINGS.MAX_URL) {
        await ctx.reply(ctx.t('max-nbr-url', {
            max: SETTINGS.MAX_URL
        }));
        return
    }
    ctx.session.route = 'add-url'
    await ctx.reply(ctx.t('add'))
})

composer.command('del', async ctx => {
    console.debug('** command /del')
    // Check if the list is empty previous to /del conversation
    if (ctx.session.urlData.length == 0) {
        await ctx.reply(ctx.t('empty-list'));
        return
    }

    // Define inlineKeyboard
    const inlineKeyboard = new InlineKeyboard()
    ctx.session.urlData.forEach(function (value: UrlData, index: number) {
            inlineKeyboard.text(`=> ${index + 1} <=`, `del-payload ${index + 1}`)
        })

    // Send a message with inlineKeyboard to the Chat asking to select the URL to delete from monitoring list
    await ctx.reply(ctx.t('del') + "\n" + getListURL(ctx.session.urlData), {
                    reply_markup: inlineKeyboard,
                    link_preview_options : { is_disabled: true }
                    });

})

// Commande *** /don ***
composer.command('donate', handleDonate);


composer.command('dotask', async ctx => {
    console.debug('** command /dotask')
    const res = await doTask();
    console.log(res);
    await ctx.reply(res);
})

composer.command('test', async ctx => {
    console.debug('** command /test')
    ctx.session.route = 'test-url'
    await ctx.reply(ctx.t('test'));
})

composer.on('message', async (ctx) => {
    console.debug('** other command not found')
    ctx.session.count++
    await ctx.reply(`Message count: ${ctx.session.count}`)
  })


composer.on("callback_query:data", async ctx => {
    const payload = ctx.callbackQuery.data.split(' ')[0];
    const nbr = ctx.callbackQuery.data.split(' ')[1];
    console.debug("Clicked on button: " + payload + " " + nbr);

    // If it's a callback coming from a 'delete' button
    if (payload === "del-payload") {
        await ctx.answerCallbackQuery({
            text: ctx.t('deleted-url-popup', {
                nbr: nbr
             })
        });

        // Remove InlineKeybord
        ctx.editMessageReplyMarkup( { reply_markup : undefined} )

        // Delete the selected URL from list
        ctx.session.urlData.splice(+nbr-1, 1)
        
        // Show confirmation message
        await ctx.reply(ctx.t('deleted-url', {
           nbr: nbr
        }));
    }
    else {
        console.warn(`Not a recognized payload: ${payload} ${nbr}`);
    }
  });

composer.use(async ctx => {
    await ctx.reply('Not a recognised input. If you need help, do /help.')
})

export { composer }