#!/bin/bash
# Set Bot Webhook

# LOAD environment variables
. ../.env

wget -v https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo


