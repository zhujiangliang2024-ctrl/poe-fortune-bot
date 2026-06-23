const { Client, GatewayIntentBits, TextChannel, EmbedBuilder } = require('discord.js');

const TOKEN = process.env.DISCORD_TOKEN;
const GUILD_ID = '1518803611792969738';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// ==================== MESSAGES ====================

const WELCOME_DM = `
🎮 Welcome to POE Fortune, Exile! 🎮

We're excited to have you join our Path of Exile 2 community!

━━━━━━━━━━━━━━━━━━━━━━

📌 QUICK LINKS:
• #poe-fortune — Main chat
• #announcements — Server news
• #class-builds — Build guides
• #trade-requests — Trading post
• #bugs-report — Bug reports

━━━━━━━━━━━━━━━━━━━━━━

💬 GETTING STARTED:
Introduce yourself in #poe-fortune! What class are you playing? Any questions? Just ask — our community is here to help!

Good luck out there, Exile! 🏆
`;

const RULES_EMBED = new EmbedBuilder()
  .setColor('#FF6B00')
  .setTitle('📋 POE Fortune - Server Rules')
  .setDescription('Welcome to POE Fortune! Please follow these rules to keep our community awesome.')
  .addFields(
    { name: '1️⃣ Be Respectful', value: 'Treat all members with respect. No harassment, hate speech, or personal attacks.' },
    { name: '2️⃣ No Spam', value: "Don't spam messages or channels. Keep discussions relevant and meaningful." },
    { name: '3️⃣ No Unauthorized Advertising', value: 'No selling, trading, or promoting outside designated channels.' },
    { name: '4️⃣ Keep Content Appropriate', value: 'All content must be PG-13. No NSFW or offensive material.' },
    { name: '5️⃣ Help Others', value: 'Our community thrives when Exiles help each other out!' },
    { name: '6️⃣ Follow Discord ToS', value: 'All members must follow Discord\'s Terms of Service.' }
  )
  .setFooter({ text: 'Violations may result in warnings or bans. Good luck, Exiles! ⚔️' });

const ANNOUNCEMENT_EMBED = new EmbedBuilder()
  .setColor('#00FF88')
  .setTitle('🎮 Welcome to POE Fortune!')
  .setDescription('The ultimate Path of Exile 2 community hub!')
  .addFields(
    { name: '📌 Channel Overview', value: '• #poe-fortune — Main chat\n• #announcements — News\n• #class-builds — Build guides\n• #trade-requests — Trading\n• #bugs-report — Bug reports' },
    { name: '💬 Getting Started', value: 'Introduce yourself! What class are you playing?' },
    { name: '❓ Need Help?', value: 'Ask in #technical-help or DM an admin!' }
  )
  .setFooter({ text: 'Good luck, Exiles! 🏆' });

// ==================== AUTO REPLIES ====================

const AUTO_REPLIES = {
  'hello': 'Hey there, Exile! Welcome to POE Fortune! 🎮',
  'hi': 'Hey there, Exile! Welcome to POE Fortune! 🎮',
  'hey': 'Hey there, Exile! Welcome to POE Fortune! 🎮',
  'help': 'Need help? Check out #technical-help or ask in #poe-fortune! ❓',
  'build': 'Check out #class-builds for the latest build guides! 🔥',
  'builds': 'Check out #class-builds for the latest build guides! 🔥',
  'trade': 'Visit #trade-requests to post your trade requests! 💰',
  'trading': 'Visit #trade-requests to trade with other Exiles! 💎',
  'currency': 'Looking to trade? Head to #trade-requests! 💎',
  'crafting': 'For crafting tips, check out our guides in #class-builds! ⚒️',
  'league': 'Which league are you playing? Let us know in #general-chat! 🏆',
  'patch': 'Check #patch-notes for the latest updates! 📜',
  'news': 'Check #announcements for the latest news! 📢',
  'bug': 'Report bugs in #bugs-report! 🐛',
  '组队': 'Check out #lfg for group finding! 👥',
  'lfg': 'Check out #lfg for group finding! 👥',
  'class': 'What class are you playing? Share in #class-builds! 🎭',
  'merci': "You're welcome, Exile! Anytime! 👍",
  'thanks': "You're welcome, Exile! Anytime! 👍",
  'thank you': "You're welcome, Exile! Anytime! 👍"
};

// ==================== CHANNEL SETUP ====================

const CHANNEL_STRUCTURE = [
  { category: 'POE Fortune', channels: [
    { name: 'poe-fortune', desc: 'Main chat & community hub', type: 'text' },
    { name: 'announcements', desc: 'Server news & updates', type: 'text' },
    { name: 'fortune-rules', desc: 'Server rules', type: 'text' }
  ]},
  { category: 'POE2 新闻', channels: [
    { name: 'announcements', desc: 'Official announcements', type: 'text' },
    { name: 'patch-notes', desc: 'Version updates', type: 'text' },
    { name: 'dev-news', desc: 'Developer news', type: 'text' }
  ]},
  { category: 'POE2 入门', channels: [
    { name: 'new-player-guide', desc: 'New player guide', type: 'text' },
    { name: 'class-builds', desc: 'Class builds & guides', type: 'text' },
    { name: 'farming-routes', desc: 'Farming routes', type: 'text' }
  ]},
  { category: 'POE2 交易', channels: [
    { name: 'trade-requests', desc: 'Trade requests', type: 'text' },
    { name: 'price-check', desc: 'Price inquiries', type: 'text' },
    { name: 'trade-logs', desc: 'Trade records', type: 'text' }
  ]},
  { category: 'POE2 聊天', channels: [
    { name: 'general-chat', desc: 'General chat', type: 'text' },
    { name: 'memes', desc: 'Memes & fun', type: 'text' },
    { name: 'lfg', desc: 'Looking for group', type: 'text' }
  ]},
  { category: 'POE2 技术支持', channels: [
    { name: 'bugs-report', desc: 'Bug reports', type: 'text' },
    { name: 'technical-help', desc: 'Technical support', type: 'text' }
  ]},
  { category: '机器人', channels: [
    { name: 'bot-commands', desc: 'Bot commands', type: 'text' }
  ]}
];

// ==================== FUNCTIONS ====================

async function setupChannels() {
  const guild = await client.guilds.fetch(GUILD_ID);
  console.log(`Setting up channels for: ${guild.name}`);

  for (const cat of CHANNEL_STRUCTURE) {
    // Skip if category already exists
    const existingCat = guild.channels.cache.find(c => c.name === cat.category && c.type === 4);
    let category;

    if (!existingCat) {
      category = await guild.channels.create({
        name: cat.category,
        type: 4
      });
      console.log(`✅ Created category: ${cat.category}`);
    } else {
      category = existingCat;
      console.log(`📁 Category exists: ${cat.category}`);
    }

    for (const ch of cat.channels) {
      const existingChannel = guild.channels.cache.find(c => c.name === ch.name);
      if (!existingChannel) {
        await guild.channels.create({
          name: ch.name,
          type: 0,
          topic: ch.desc,
          parent: category.id
        });
        console.log(`  ✅ Created channel: #${ch.name}`);
      } else {
        console.log(`  📝 Channel exists: #${ch.name}`);
      }
    }
  }
}

async function postAnnouncements() {
  const guild = await client.guilds.fetch(GUILD_ID);
  const announcementsChannel = guild.channels.cache.find(c => c.name === 'announcements');

  if (announcementsChannel) {
    await announcementsChannel.send({ embeds: [ANNOUNCEMENT_EMBED] });
    console.log('✅ Posted announcement in #announcements');
  }

  const rulesChannel = guild.channels.cache.find(c => c.name === 'fortune-rules');
  if (rulesChannel) {
    await rulesChannel.send({ embeds: [RULES_EMBED] });
    console.log('✅ Posted rules in #fortune-rules');
  }

  const fortuneChannel = guild.channels.cache.find(c => c.name === 'poe-fortune');
  if (fortuneChannel) {
    await fortuneChannel.send(WELCOME_DM);
    console.log('✅ Posted welcome in #poe-fortune');
  }
}

// ==================== EVENT HANDLERS ====================

client.on('guildMemberAdd', async (member) => {
  if (member.guild.id === GUILD_ID) {
    try {
      await member.send(WELCOME_DM);
      console.log(`✅ Sent welcome DM to ${member.user.username}`);
    } catch (e) {
      console.log(`Could not DM ${member.user.username}`);
    }
  }
});

client.on('messageCreate', async (message) => {
  // Ignore bots
  if (message.author.bot) return;

  // Check if in POE Fortune related channels
  const allowedChannels = [
    'poe-fortune', 'announcements', 'general-chat',
    'class-builds', 'trade-requests', 'technical-help'
  ];

  if (!allowedChannels.includes(message.channel.name)) return;

  const content = message.content.toLowerCase();

  for (const [keyword, reply] of Object.entries(AUTO_REPLIES)) {
    if (content.includes(keyword)) {
      await message.reply(reply);
      console.log(`Auto-replied to "${keyword}" in #${message.channel.name}`);
      break;
    }
  }
});

// ==================== STARTUP ====================

client.on('ready', async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
  console.log(`🏠 Server ID: ${GUILD_ID}`);

  // Setup channels on first run
  await setupChannels();

  // Post announcements
  await postAnnouncements();

  console.log('\n🎉 POE Fortune Bot is fully operational!');
  console.log('📌 Auto-replies are active in all channels.');
});

client.login(TOKEN);
