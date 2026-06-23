const { Client, GatewayIntentBits, TextChannel } = require('discord.js');

const TOKEN = '2dc5d65916cdc8986ebe6c3f27511c123e6a2d4c3869f164b7e7c5326ea80d7c';
const GUILD_ID = '1518803611792969738';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Welcome message in American English
const WELCOME_MESSAGE = `
🎮 **Welcome to POE Fortune!** 🎮

Hey there, Exile! Welcome to the community. We're glad to have you here!

📜 **Quick Links:**
• #announcements - Latest news
• #class-builds - Check out build guides
• #trade-requests - Trading post
• #general-chat - Chat with fellow players

💬 **Getting Started:**
Feel free to introduce yourself in #general-chat! What class are you playing? Any questions? Just ask - we're here to help!

Good luck out there, Exile! 🏆
`;

// Auto-reply responses for POE Fortune channel
const AUTO_REPLIES = {
  'hello': 'Hey there, Exile! Welcome to POE Fortune! 🎮',
  'hi': 'Hey there, Exile! Welcome to POE Fortune! 🎮',
  'help': 'Need help? Check out #new-player-guide for tips, or ask in #technical-help!',
  'build': 'Check out #class-builds for the latest build guides! 🔥',
  'trade': 'Visit #trade-requests to post your trade requests! 💰',
  'currency': 'Looking to trade? Head to #trade-requests! 💎',
  'crafting': 'For crafting tips, check out our guides in #class-builds! ⚒️',
  'league': 'Which league are you playing? Let us know in #general-chat! 🏆',
  'thanks': "You're welcome, Exile! Anytime! 👍",
  'thank you': "You're welcome, Exile! Anytime! 👍"
};

async function setupPOEFortune() {
  const guild = await client.guilds.fetch(GUILD_ID);
  
  // Create POE Fortune category
  const category = await guild.channels.create({
    name: 'POE Fortune',
    type: 4
  });
  console.log('✅ Created category: POE Fortune');
  
  // Create main channel
  const fortuneChannel = await guild.channels.create({
    name: 'poe-fortune',
    type: 0,
    topic: 'POE Fortune - Share your builds, trades, and experiences!',
    parent: category.id
  });
  console.log('✅ Created channel: poe-fortune');
  
  // Create rules channel
  const rulesChannel = await guild.channels.create({
    name: 'fortune-rules',
    type: 0,
    topic: 'Server rules and guidelines',
    parent: category.id
  });
  console.log('✅ Created channel: fortune-rules');
  
  // Send welcome message in the channel
  await fortuneChannel.send(WELCOME_MESSAGE);
  console.log('✅ Sent welcome message');
  
  // Set up welcome message for new members
  const rulesMessage = `
📋 **POE Fortune Server Rules:**

1. Be respectful to other players
2. No spam or advertising without permission
3. Keep discussions on-topic
4. Help others when you can
5. Have fun and good luck, Exiles!

Join us and let's conquer Wraeclast together! 🏆
`;
  await rulesChannel.send(rulesMessage);
  console.log('✅ Sent rules message');
  
  console.log('\n🎉 POE Fortune setup complete!');
  console.log('\nChannel IDs:');
  console.log(`  Category: ${category.id}`);
  console.log(`  Main Channel: ${fortuneChannel.id}`);
  console.log(`  Rules Channel: ${rulesChannel.id}`);
}

// Handle new member joins
client.on('guildMemberAdd', async (member) => {
  if (member.guild.id === GUILD_ID) {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'poe-fortune');
    if (channel) {
      const welcomeDM = `
Welcome to POE Fortune, ${member.user.username}! 🎮

We're excited to have you join our community of Path of Exile 2 enthusiasts!

Check out our channels:
• #poe-fortune - Main chat
• #fortune-rules - Server rules
• #class-builds - Build guides
• #trade-requests - Trading

Good luck, Exile! 🏆
`;
      try {
        await member.send(welcomeDM);
        console.log(`✅ Sent welcome DM to ${member.user.username}`);
      } catch (e) {
        console.log(`Could not DM ${member.user.username}`);
      }
    }
  }
});

// Handle messages for auto-reply
client.on('messageCreate', async (message) => {
  // Ignore bots
  if (message.author.bot) return;
  
  // Check if in poe-fortune channel
  if (message.channel.name === 'poe-fortune') {
    const content = message.content.toLowerCase();
    
    for (const [keyword, reply] of Object.entries(AUTO_REPLIES)) {
      if (content.includes(keyword)) {
        await message.reply(reply);
        console.log(`Auto-replied to "${keyword}" in poe-fortune`);
        break;
      }
    }
  }
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  console.log('Setting up POE Fortune...');
  setupPOEFortune().then(() => {
    console.log('\nBot is ready! Auto-replies are active.');
  });
});

client.login(TOKEN);
