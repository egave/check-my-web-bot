import { Router } from '@grammyjs/router'
import { Context, Keyboard } from 'grammy'
import type { CustomContext } from '../types/CustomContext'
import { CHECK_TYPE } from '../config'
import { validURL } from '../utils/validURL'
import { getWebResourceInfo } from '../utils/getWebResourceInfo'

const router = new Router<CustomContext>(ctx => ctx.session.route)

router.route('add-url', async ctx => {
    const urlToAdd = String(ctx.msg?.text)
    // Check if submitted URL is valid
    if (!validURL(urlToAdd)) {
        ctx.session.route = ''
        await ctx.reply(ctx.t('invalid-url'));
        return;
    }

    // Check if URL is already in the list of URLs to be monitored
    const urlInLIst:boolean = ctx.session.urlData.some(({ url }) => url === urlToAdd);
    if (urlInLIst === true) {
        ctx.session.route = ''
        await ctx.reply(ctx.t('url-already-listed'));
        return;
    }

    ctx.session.urlToAdd = urlToAdd;
    ctx.session.route = 'ask-action-type';
    await ctx.reply(ctx.t('ask-action-type'), {
        reply_markup: {
          one_time_keyboard: true,
          keyboard: new Keyboard()
          .text(CHECK_TYPE[0]).text(CHECK_TYPE[1]).build(),
        },
    });
})


 
router.route('ask-action-type', async ctx => {
    // Should not happen, unless session data is corrupted.
    const urlToAdd = ctx.session.urlToAdd;
    if (urlToAdd === undefined) {
        await ctx.reply(ctx.t('missing-url'));
        ctx.session.route = "add-url";
        return;
    }

    // Check type is not a valid type.
    const checkType = CHECK_TYPE.indexOf(String(ctx.msg?.text));
    if (checkType === -1) {
        await ctx.reply(ctx.t('wrong-check-type'));
        return;
      }

    // GET the Web resource
    const result = await getWebResourceInfo(urlToAdd);
    // Error in the GET
    if (result.error?.valueOf() ) {
        console.log(`/add URL ${urlToAdd} failed with error: ${result.error}`)
        await ctx.reply(ctx.t('get-web-resource-failed', {
            url: urlToAdd,
            error: result.error
        }));
    }
    else {
        if (result.status != 200) {
            // GET did not returned a 200 HTTP status code  
            console.log(`/add URL ${urlToAdd} failed. GET request returned status: ${result.status}`)
            await ctx.reply(ctx.t('get-bad-status', {
                            url: urlToAdd,
                            status: result.status ? result.status : -1 
                            }), {
                    reply_markup: { remove_keyboard: true }
            });
        } 
        else {
            // GET returned a 200 HTTP status code. We can add the URL to the list.
           
            // if (ctx.session.url.length == 0)
            //     ctx.session.url = []
            //const urlData:UrlData = { url, ACTION['PING'], -1 }
            ctx.session.urlData.push({ 'url': urlToAdd, 'check_type': CHECK_TYPE[checkType], 'content_type': result.contentType, 'last_status': result.status, 'last_md5': result.bodyMD5 })
            console.log(`/add URL ${urlToAdd} suceeded`)
            await ctx.reply(ctx.t('added-url', {
                url: urlToAdd,
                contentType: (result.contentType != undefined)?result.contentType:"undefined",
                status: result.status,
                md5: (result.bodyMD5 != undefined)?result.bodyMD5:"undefined"
            }),  {
                reply_markup: { remove_keyboard: true }
            });
            //await ctx.reply(url+' is a valid URL.\nContent-Type=' + result.contentType + '\nStatus=' + result.status + '\nbodyMD5='+result.bodyMD5);
        }
    }
    ctx.session.urlToAdd = "";
    ctx.session.route = "";
})

export { router }