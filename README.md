# [grammY](https://grammy.dev) on [Deta](https://deta.sh)

## What is this 'Check-My-Web' Bot about


## Preparation

1. Create a new Deta Account on [deta.sh](https://deta.sh)
2. [Install Deta CLI](https://docs.deta.sh/docs/cli/install)
3. Create a new project on [deta.sh](https://deta.sh). Make sure to select Europe region (there is no way to know it from the UI, so it's better to reassure). Skip if you already have one
4. Create a new Deta Micro project by Running `deta new --node <MICRO_NAME> --project <PROJECT_NAME>`. This creates a `<MICRO_NAME>` directory where to put your code.
5. You can clone this Bot by cloning its GiHub repository `git clone https://github.com/egave/check-my-web-bot.git`
    51. Then copy the `check-my-web-bot` code in your `<MICRO_NAME>` repository.
5. Create a new Bot in Telegram. For this :
    11. Open Telegram application, search for 'BotFather' Bot. 
    12. Start creating a new bot with the '/newbot' command.
    13. At the end of the creation process, copy the 'bot token to access the HTTP API'
3. Change `.env` key values
    21. Put your bot token in the `.env` file under the BOT_TOKEN key
    22. Put your bot token removed of all special caracters in the `.env` file under the SECRET_PATH key
5. Run `deta update -e .env` to sync the token
6. Run `yarn install` to install dependencies
7. Run `yarn deploy` to deploy the project
8. Set your bot's webhook url to `<ENDPOINT>/<TOKEN>` (replacing `<...>` with respective values). Endpoint can be seen by running `deta details` (`"endpoint"` property). In order to do that, run this url (in your browser, for example): `https://api.telegram.org/bot<TOKEN>/setWebhook?url=<ENDPOINT>/<TOKEN>`
9. Check your bot's webhook url. Run this url in your browser :
`https://api.telegram.org/bot<TOKEN>/getWebhookInfo`

## Running the bot locally

Use `yarn dev` to run the bot locally for development.

Note that it will delete webhook url and you'll need to repeat the 3rd step to be able to run the bot on Deta (or you can use a different token).

Note that you'll have to manually provide `DETA_PROJECT_KEY` env in order for Deta Base session storage to work.
It can be obtained on the Project Settings page.
