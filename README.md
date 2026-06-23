# POE Fortune Bot 🎮

Discord bot for POE2 community - Path of Exile 2 community hub with welcome messages, auto-replies, and announcements.

## Features

- ✅ Auto-create POE Fortune channels & categories
- ✅ Welcome messages for new members (DM)
- ✅ Professional announcements & rules (Embeds)
- ✅ Auto-replies for common keywords
- ✅ 24/7 automatic operation on Railway

## Channel Structure

```
📁 POE Fortune
   ├── #poe-fortune (Main chat)
   ├── #announcements (News)
   └── #fortune-rules (Rules)

📁 POE2 新闻
   ├── #announcements
   ├── #patch-notes
   └── #dev-news

📁 POE2 入门
   ├── #new-player-guide
   ├── #class-builds
   └── #farming-routes

📁 POE2 交易
   ├── #trade-requests
   ├── #price-check
   └── #trade-logs

📁 POE2 聊天
   ├── #general-chat
   ├── #memes
   └── #lfg

📁 POE2 技术支持
   ├── #bugs-report
   └── #technical-help

📁 机器人
   └── #bot-commands
```

## Auto-Replies

| Keyword | Response |
|---------|----------|
| hello/hi/hey | Welcome message |
| help | Technical help link |
| build/builds | Class builds link |
| trade/trading | Trade requests link |
| crafting | Crafting tips |
| league | League info |
| patch/news | Latest updates |
| bug | Bug report link |
| lfg/组队 | Group finder |
| class | Class discussion |
| thanks | You're welcome |

## Deploy to Railway (Free)

1. Fork or clone this repo
2. Go to https://railway.app
3. Login with GitHub
4. Click "New Project" → "Deploy from GitHub"
5. Select this repo
6. Add Environment Variable:
   - `DISCORD_TOKEN` = your bot token
7. Deploy!

## Local Run

```bash
npm install
node poe-fortune-bot.js
```

## Discord Bot Setup

1. Go to https://discord.com/developers/applications
2. Create New Application
3. Bot → Reset Token → Copy Token
4. OAuth2 → URL Generator:
   - Scopes: bot
   - Permissions: Send Messages, Manage Channels, Embed Links, etc.
5. Use generated URL to add bot to server

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| DISCORD_TOKEN | Yes | Bot token from Discord Developer Portal |

## Support

For issues or questions, contact server admins.
