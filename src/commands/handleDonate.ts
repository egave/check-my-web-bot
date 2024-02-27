import type { CustomContext } from '../types/CustomContext.ts'
import { PAYPAL_DONATE_LINK, PAYPAL_DONATE_TEXT, DEV_USERNAME } from '../config.ts'

export default async function handleDonate(ctx: CustomContext) {
    console.log('** command /don');

    await ctx.reply(ctx.t('donate', {
        link: PAYPAL_DONATE_LINK,
        text: PAYPAL_DONATE_TEXT,
        dev_username: DEV_USERNAME
    }),
    { parse_mode: "HTML" });
}
