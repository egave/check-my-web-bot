import kv from '../service/db.ts'
import { UrlData } from '../types/UrlData.ts';
import { bot } from '../bot.ts';
import { getWebResourceInfo } from '../utils/getWebResourceInfo.ts';
import { CHECK_TYPE } from '../config.ts';

export async function doTask():Promise<string> {
    try {
        console.debug("Inside doTask()");
        //const result = await SessionDb.find({});

        // Récupère toutes les sessions
        const iter = kv.list<string>({ prefix: ["sessions"] });

        //console.debug("Db 'session' contains:" + result.count + " 'Check-My-Web Bot' session(s)")
        // For Each Check-My-Web Bot Chat-Id represented by the session 'key'

        // WARNING: DON'T USE foreach loop
        // as Async/await doesn't work in the forEach loop (because it works in parallel)
        for await (const result of iter) {
            let userId = Number(result.key[1]);
            let myUrlData:UrlData[] = <UrlData[]>result.value.urlData;
            console.debug("* * *\nsession for key: '" + result.key + "' has " + myUrlData.length + " items")
            
            // WARNING: DON'T USE foreach loop
            // as Async/await doesn't work in the forEach loop (because it works in parallel)
            for (let i = 0; i < myUrlData.length; i++) {
                console.debug("Checking URL : " + myUrlData[i].url)
                const checkResult = await getWebResourceInfo(myUrlData[i].url);
                if (checkResult.error?.valueOf()) {
                    console.debug('=> Request failed')
                    console.debug('Content-Type=' + checkResult.contentType + '\nStatus=' + checkResult.status + '\nbodyMD5='+checkResult.bodyMD5);
                    // await ctx.reply('But GET request failed with error: "' + result.error + '"');
                }
                else {
                    //console.log('Request suceeded')
                    //console.log('Content-Type=' + checkResult.contentType + '\nStatus=' + checkResult.status + '\nbodyMD5='+checkResult.bodyMD5);
                    // FOR Testing PURPOSE //await bot.api.sendMessage(userId, 'Content-Type=' + checkResult.contentType + '\nStatus=' + checkResult.status + '\nbodyMD5='+checkResult.bodyMD5);
                    //let notifMessage:string = "";
                    switch (myUrlData[i].check_type) {
                        // CHECK-STATUS
                        case CHECK_TYPE[0]:
                            if (checkResult.status != 200) {
                                //notifMessage = "check-status-failed"
                                console.debug('check-status-failed');
                                await bot.api.sendMessage(userId, 
                                        `CHECK-STATUS ERROR: URL : ${myUrlData[i].url}, status: ${checkResult.status}`)
                            }
                            break;
                        // CHECK-MD5
                        case CHECK_TYPE[1]:
                            if (checkResult.bodyMD5 != myUrlData[i].last_md5) {
                                //notifMessage = "check-md5-failed"
                                console.debug('check-md5-failed');
                                await bot.api.sendMessage(userId, 
                                    `CHECK-MD5 ERROR: URL : ${myUrlData[i].url}, md5: ${checkResult.bodyMD5}`)
                            }
                            break;
                        
                        // CHECK-WORD-HIT
                        case CHECK_TYPE[2]:
                            if (checkResult.data.search(myUrlData[i].sentence) == -1) {
                                //notifMessage = "check-word-hit-failed"
                                console.debug('check-word-hit-failed');
                                await bot.api.sendMessage(userId, 
                                    `CHECK-WORD-HIT ERROR: URL : ${myUrlData[i].url}, md5: ${checkResult.bodyMD5}, body does not contains sentence "${myUrlData[i].sentence}""`)
                            }
                            break;
                    
                        // CHECK-WORD-MISS
                        case CHECK_TYPE[3]:
                            if (checkResult.data.search(myUrlData[i].sentence) != -1) {
                                //notifMessage = "check-word-miss-failed"
                                console.debug('check-word-miss-failed');
                                await bot.api.sendMessage(userId, 
                                    `CHECK-WORD-MISS ERROR: URL : ${myUrlData[i].url}, md5: ${checkResult.bodyMD5}, body should not contains sentence "${myUrlData[i].sentence}""`)
                            }
                            break;
                        default:
                            break;
                    } (myUrlData[i].check_type)
                }
            }
        }
        return "doTask completed"
    }
    catch (error){
        return "An error occured in doTask() :"+error
    }
}