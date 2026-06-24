FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY poe-fortune-bot.js ./

ENV DISCORD_TOKEN=2dc5d65916cdc8986ebe6c3f27511c123e6a2d4c3869f164b7e7c5326ea80d7c

CMD ["node", "poe-fortune-bot.js"]
