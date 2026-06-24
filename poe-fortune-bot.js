const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

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

// ==================== DELTA FORCE TOOLS STYLE CONTENT ====================

const HEADER_EMBED = new EmbedBuilder()
  .setColor('#FF6B00')
  .setTitle('🎮 POE Fortune - Path of Exile 2 Community')
  .setURL('https://poefortune.gg')
  .setDescription('The ultimate Path of Exile 2 community hub!')
  .addFields(
    { name: '📌 Navigation', value: 'Use the channels below to navigate our community' },
    { name: '❓ Need Help?', value: 'DM an admin or post in #technical-help' }
  )
  .setFooter({ text: 'POE Fortune | Good luck, Exiles! 🏆' })
  .setTimestamp();

// ==================== CHANNEL STRUCTURE (Based on Delta Force Tools) ====================

const CHANNEL_STRUCTURE = [
  // Main Category - POE Fortune Hub
  { category: '📌 POE Fortune', channels: [
    { name: 'poe-fortune', desc: 'Main chat & community hub', type: 'text' },
    { name: 'announcements', desc: 'Server news & updates', type: 'text' },
    { name: 'fortune-rules', desc: 'Server rules & guidelines', type: 'text' },
    { name: 'community', desc: 'Community announcements', type: 'text' }
  ]},
  
  // News & Updates - Like DF Updates
  { category: '📢 News & Updates', channels: [
    { name: 'announcements', desc: 'Official announcements', type: 'text' },
    { name: 'patch-notes', desc: 'Version updates & patch notes', type: 'text' },
    { name: 'dev-news', desc: 'Developer news & dev streams', type: 'text' },
    { name: 'league-info', desc: 'League start dates & info', type: 'text' }
  ]},
  
  // Game Data - Like Weapon Builds, Auction House
  { category: '⚔️ Game Data', channels: [
    { name: 'class-builds', desc: 'Class builds & skill trees', type: 'text' },
    { name: 'item-showcase', desc: 'Showcase your rare items', type: 'text' },
    { name: 'crafting-guides', desc: 'Crafting tips & recipes', type: 'text' },
    { name: 'price-check', desc: 'Item price inquiries', type: 'text' }
  ]},
  
  // Trading - Like Auction House
  { category: '💰 Trading', channels: [
    { name: 'trade-requests', desc: 'Buy, sell, or trade items', type: 'text' },
    { name: 'trade-logs', desc: 'Completed trade records', type: 'text' },
    { name: 'price-check', desc: 'Check item values', type: 'text' },
    { name: 'vendor-trades', desc: 'Vendor recipes & deals', type: 'text' }
  ]},
  
  // Map & Routes - Like Map Meta
  { category: '🗺️ Map & Routes', channels: [
    { name: 'farming-routes', desc: 'Best farming routes', type: 'text' },
    { name: 'atlas-strategy', desc: 'Atlas tree strategies', type: 'text' },
    { name: 'delve-routes', desc: 'Delve mining routes', type: 'text' },
    { name: 'heist-routes', desc: 'Heist league routes', type: 'text' }
  ]},
  
  // Support - Like Give Feedback
  { category: '🎯 Support', channels: [
    { name: 'bugs-report', desc: 'Report in-game bugs', type: 'text' },
    { name: 'technical-help', desc: 'Technical support & fixes', type: 'text' },
    { name: 'feedback', desc: 'Give us your feedback', type: 'text' },
    { name: 'suggestions', desc: 'Suggest new features', type: 'text' }
  ]},
  
  // Social
  { category: '💬 Social', channels: [
    { name: 'general-chat', desc: 'General chat', type: 'text' },
    { name: 'memes', desc: 'Memes & funny content', type: 'text' },
    { name: 'lfg', desc: 'Looking for group', type: 'text' },
    { name: 'achievements', desc: 'Show off achievements', type: 'text' }
  ]},
  
  // Bot Commands
  { category: '🤖 Bot', channels: [
    { name: 'bot-commands', desc: 'Available bot commands', type: 'text' },
    { name: 'bot-support', desc: 'Bot issues & help', type: 'text' }
  ]}
];

// ==================== RULES (Delta Force Tools Style) ====================

const RULES_EMBED = new EmbedBuilder()
  .setColor('#FF6B00')
  .setTitle('📋 POE Fortune - Server Rules')
  .setURL('https://poefortune.gg/rules')
  .setDescription('Please follow these rules to keep our community awesome!')
  .addFields(
    { name: '1️⃣ Be Respectful', value: 'Treat all members with respect. No harassment, hate speech, or personal attacks.' },
    { name: '2️⃣ No Spam', value: "Don't spam messages, channels, or friend requests." },
    { name: '3️⃣ No Unauthorized Advertising', value: 'No selling, trading, or promoting outside #trade-requests.' },
    { name: '4️⃣ Keep Content Appropriate', value: 'All content must be PG-13. No NSFW or offensive material.' },
    { name: '5️⃣ No Impersonation', value: "Don't pretend to be admins or other members." },
    { name: '6️⃣ Help Others', value: 'Our community thrives when Exiles help each other!' },
    { name: '7️⃣ Follow Discord ToS', value: 'All members must follow Discord Terms of Service.' }
  )
  .addField({ name: '⚠️ Violations', value: 'Breaking rules may result in: Warning → Mute → Kick → Ban', inline: true })
  .setFooter({ text: 'Questions? DM an admin. Good luck, Exiles! ⚔️' })
  .setTimestamp();

// ==================== WELCOME MESSAGE ====================

const WELCOME_DM = `
🎮 Welcome to POE Fortune, Exile! 🎮

━━━━━━━━━━━━━━━━━━━━━━

Thank you for joining our Path of Exile 2 community!

📌 QUICK LINKS:
• #poe-fortune — Main chat
• #announcements — News & updates
• #class-builds — Build guides
• #trade-requests — Trading
• #bugs-report — Bug reports

━━━━━━━━━━━━━━━━━━━━━━

💬 GETTING STARTED:
• Introduce yourself in #poe-fortune
• Check out #class-builds for builds
• Read #fortune-rules for server rules

━━━━━━━━━━━━━━━━━━━━━━

❓ NEED HELP?
Post in #technical-help or DM an admin!

Good luck out there, Exile! 🏆
`;

// ==================== AUTO REPLIES ====================

const AUTO_REPLIES = {
  // Greetings
  'hello': 'Hey there, Exile! Welcome to POE Fortune! 🎮',
  'hi': 'Hey there, Exile! Welcome to POE Fortune! 🎮',
  'hey': 'Hey there, Exile! Welcome to POE Fortune! 🎮',
  'what\'s up': 'Hey Exile! Need anything? 🎮',
  
  // Help
  'help': 'Need help? Check #technical-help or ask in #poe-fortune! ❓',
  'how do i': 'Check #class-builds or #new-player-guide for guides! 📚',
  
  // Builds
  'build': 'Check out #class-builds for the latest builds! 🔥',
  'builds': 'Check out #class-builds for the latest builds! 🔥',
  'class': 'What class are you playing? Share in #class-builds! 🎭',
  'skill tree': 'Check #class-builds for skill tree guides! 🌳',
  
  // Trading
  'trade': 'Visit #trade-requests to trade with other Exiles! 💰',
  'trading': 'Visit #trade-requests to trade with other Exiles! 💰',
  'sell': 'Post in #trade-requests! 💎',
  'buy': 'Check #trade-requests or post what you need! 💎',
  'currency': 'Check #trade-requests for currency trading! 💎',
  
  // Crafting
  'crafting': 'Check #crafting-guides for crafting tips! ⚒️',
  'craft': 'Check #crafting-guides for crafting tips! ⚒️',
  
  // Maps
  'map': 'Check #farming-routes for map guides! 🗺️',
  'farming': 'Check #farming-routes for best farming spots! 🗺️',
  'route': 'Check #farming-routes for routes! 🗺️',
  
  // Game Info
  'league': 'Check #league-info for league dates! 🏆',
  'patch': 'Check #patch-notes for the latest patches! 📜',
  'news': 'Check #announcements for the latest news! 📢',
  'update': 'Check #patch-notes for updates! 📜',
  
  // Support
  'bug': 'Report bugs in #bugs-report! 🐛',
  'error': 'Post in #technical-help with error details! 🔧',
  'crash': 'Post in #technical-help with crash logs! 🔧',
  
  // Social
  '组队': 'Check out #lfg for group finding! 👥',
  'lfg': 'Check out #lfg for group finding! 👥',
  'group': 'Check out #lfg to find groups! 👥',
  
  // Thanks
  'thanks': "You're welcome, Exile! Anytime! 👍",
  'thank you': "You're welcome, Exile! Anytime! 👍",
  'thx': "You're welcome, Exile! Anytime! 👍",
  'merci': "You're welcome, Exile! Anytime! 👍"
};

// ==================== FUNCTIONS ====================

async function setupChannels() {
  const guild = await client.guilds.fetch(GUILD_ID);
  console.log(`\n🏠 Setting up channels for: ${guild.name}`);

  for (const cat of CHANNEL_STRUCTURE) {
    // Check if category exists
    let category = guild.channels.cache.find(c => c.name === cat.category && c.type === 4);
    
    if (!category) {
      category = await guild.channels.create({
        name: cat.category,
        type: 4
      });
      console.log(`✅ Created: ${cat.category}`);
    } else {
      console.log(`📁 Exists: ${cat.category}`);
    }

    for (const ch of cat.channels) {
      // Check if channel exists (by name)
      const existingChannel = guild.channels.cache.find(c => c.name === ch.name);
      
      if (!existingChannel) {
        await guild.channels.create({
          name: ch.name,
          type: 0,
          topic: ch.desc,
          parent: category.id
        });
        console.log(`  ✅ #${ch.name}`);
      } else {
        console.log(`  📝 #${ch.name} (exists)`);
      }
    }
  }
}

async function postAnnouncements() {
  const guild = await client.guilds.fetch(GUILD_ID);
  
  // Post welcome in main channel
  const fortuneChannel = guild.channels.cache.find(c => c.name === 'poe-fortune');
  if (fortuneChannel) {
    await fortuneChannel.send({ embeds: [HEADER_EMBED] });
    await fortuneChannel.send(WELCOME_DM);
    console.log('\n✅ Posted welcome in #poe-fortune');
  }
  
  // Post rules in rules channel
  const rulesChannel = guild.channels.cache.find(c => c.name === 'fortune-rules');
  if (rulesChannel) {
    await rulesChannel.send({ embeds: [RULES_EMBED] });
    console.log('✅ Posted rules in #fortune-rules');
  }
  
  // Post info in announcements
  const announcementsChannel = guild.channels.cache.find(c => c.name === 'announcements');
  if (announcementsChannel) {
    const infoEmbed = new EmbedBuilder()
      .setColor('#00FF88')
      .setTitle('📢 Welcome to POE Fortune!')
      .setDescription('Your ultimate Path of Exile 2 community hub!')
      .addFields(
        { name: '📌 Navigation', value: 'Check out our channel categories below!' },
        { name: '⚔️ Game Data', value: '#class-builds, #crafting-guides, #item-showcase' },
        { name: '💰 Trading', value: '#trade-requests, #price-check' },
        { name: '🗺️ Maps', value: '#farming-routes, #atlas-strategy' },
        { name: '🎯 Support', value: '#bugs-report, #technical-help' }
      )
      .setFooter({ text: 'Good luck, Exiles! 🏆' })
      .setTimestamp();
    await announcementsChannel.send({ embeds: [infoEmbed] });
    console.log('✅ Posted info in #announcements');
  }
}

// ==================== EVENT HANDLERS ====================

client.on('guildMemberAdd', async (member) => {
  if (member.guild.id === GUILD_ID) {
    try {
      await member.send(WELCOME_DM);
      console.log(`✅ Welcome DM sent to: ${member.user.username}`);
    } catch (e) {
      console.log(`❌ Could not DM: ${member.user.username}`);
    }
  }
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  
  const allowedChannels = [
    'poe-fortune', 'general-chat', 'class-builds', 
    'trade-requests', 'crafting-guides', 'technical-help'
  ];
  
  if (!allowedChannels.includes(message.channel.name)) return;

  const content = message.content.toLowerCase();
  
  for (const [keyword, reply] of Object.entries(AUTO_REPLIES)) {
    if (content.includes(keyword)) {
      await message.reply(reply);
      console.log(`💬 Auto-reply: "${keyword}" in #${message.channel.name}`);
      break;
    }
  }
});

// ==================== STARTUP ====================

client.on('ready', async () => {
  console.log(`\n✅ Logged in as: ${client.user.tag}`);
  console.log(`🏠 Server ID: ${GUILD_ID}`);
  
  await setupChannels();
  await postAnnouncements();
  
  console.log('\n🎉 POE Fortune Bot - Fully Operational!');
  console.log('📌 All channels configured');
  console.log('📢 Announcements posted');
  console.log('💬 Auto-replies enabled');
});

client.login(TOKEN);
