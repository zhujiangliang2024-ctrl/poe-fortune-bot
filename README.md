# POE Fortune Bot

Discord bot for POE2 community with welcome messages and auto-replies.

## Features

- Welcome messages for new members
- Auto-reply in POE Fortune channel
- American English welcome语

## Deploy to Railway (Free)

1. Create GitHub repo
2. Upload these files
3. Go to https://railway.app
4. New Project → Deploy from GitHub
5. Select repo
6. Add Environment Variable:
   - `DISCORD_TOKEN` = your bot token
7. Deploy!

## Local Run

```bash
npm install
node poe-fortune-bot.js
```

## Discord Bot Token

Get from: https://discord.com/developers/applications

Required permissions:
- Send Messages
- Manage Channels
- Send TTS Messages
- Embed Links
- Read Message History
- Add Reactions
