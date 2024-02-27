#!/bin/bash
# Set Bot Webhook

# LOAD environment variables
. ../.env

wget -v https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=https://${PROJECT_NAME}.deno.dev/${BOT_TOKEN}


