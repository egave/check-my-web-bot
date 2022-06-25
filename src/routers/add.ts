import { Router } from '@grammyjs/router'
import type { CustomContext } from '../types/CustomContext'
import { ACTION } from '../config'
import { validURL } from '../utils/validURL'
import { getWebResourceInfo } from '../utils/getWebResourceInfo'

const router = new Router<CustomContext>(ctx => ctx.session.route)

router.route('add-url', async ctx => {
    ctx.session.route = ''
    // TODO: Check if URL is already in the list of URLs to be monitored

    // Check if submitted URL is valid
    const url = String(ctx.msg?.text)
    if (!validURL(url)) {
        await ctx.reply(ctx.t('invalid-url'));
        return;
    }

    // GET the Web resource
    const result = await getWebResourceInfo(url);
    // Error in the GET
    if (result.error?.valueOf() ) {
        console.log(`/add URL ${url} failed with error: ${result.error}`)
        await ctx.reply(`/add URL ${url} failed with error: ${result.error}`);
    } 
    else {
        if (result.status != 200) {
        // GET did not returned a 200 HTTP status code  
        console.log(`/add URL ${url} failed. GET request returned status: ${result.status}`)
        await ctx.reply(`/add URL ${url} failed. GET request returned status: ${result.status}`);
        } 
        else {
            // GET returned a 200 HTTP status code. We can add the URL to the list.
            
            // if (ctx.session.url.length == 0)
            //     ctx.session.url = []
            //const urlData:UrlData = { url, ACTION['PING'], -1 }
            ctx.session.urlData.push({ 'url': url, 'action': ACTION['MONITOR'], 'content_type': result.contentType, 'last_status': result.status, 'last_md5': result.bodyMD5 })
            console.log(`/add URL ${url} suceeded`)
            await ctx.reply(ctx.t('added-url', {
                url: url,
                contentType: (result.contentType != undefined)?result.contentType:"undefined",
                status: result.status,
                md5: (result.bodyMD5 != undefined)?result.bodyMD5:"undefined"
            }));
            //await ctx.reply(url+' is a valid URL.\nContent-Type=' + result.contentType + '\nStatus=' + result.status + '\nbodyMD5='+result.bodyMD5);
        }
    }
})

export { router }