const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const TOKEN = process.env.DISCORD_TOKEN;
const GUILD_ID = '1518803611792969738';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent
  ]
});

// League of Legends themed category and channel names
const CATEGORIES = {
  FORTUNE: {
    name: "🎮 League of Legends",
    channels: [
      { name: "champion-spotlight", desc: "Weekly champion discussions and builds" },
      { name: "patch-notes", desc: "Latest patch updates and meta changes" },
      { name: "esports-news", desc: "LCS, LCK, LEC, and world championship updates" }
    ]
  },
  GAME_DATA: {
    name: "📚 Game Resources",
    channels: [
      { name: "build-guides", desc: "Recommended builds for all roles" },
      { name: "lane-guides", desc: "Lane-specific strategies and matchups" },
      { name: "teamfight-tactics", desc: "TFT discussions and comps" }
    ]
  },
  TRADING: {
    name: "💰 Trading Post",
    channels: [
      { name: "account-trades", desc: "Buy, sell, or trade accounts" },
      { name: "skin-trades", desc: "Skin exchanges and giveaways" }
    ]
  },
  SUPPORT: {
    name: "🎯 Support",
    channels: [
      { name: "help-desk", desc: "Get help with gameplay questions" },
      { name: "bug-reports", desc: "Report game bugs and issues" },
      { name: "feedback", desc: "Suggestions for improving our community" }
    ]
  },
  SOCIAL: {
    name: "💬 Social Hub",
    channels: [
      { name: "lfg-rankeds", desc: "Find teammates for ranked games" },
      { name: "lfg-casuals", desc: "Casual games and ARAM" },
      { name: "memes", desc: "League memes and highlights" }
    ]
  }
};

const CHANNELS = {
  WELCOME: "welcome",
  RULES: "rules",
  ANNOUNCEMENTS: "announcements",
  INTRO: "introductions"
};

client.once('ready', async () => {
  console.log(`✅ Logged in as: ${client.user.tag}`);
  
  const guild = client.guilds.cache.get(GUILD_ID);
  if (!guild) {
    console.log("❌ Guild not found!");
    return;
  }
  
  console.log(`✅ Connected to: ${guild.name}`);
  
  // Create categories and channels
  try {
    // Create main categories
    for (const [key, category] of Object.entries(CATEGORIES)) {
      const existingCategory = guild.channels.cache.find(c => c.name === category.name && c.type === 4);
      
      if (!existingCategory) {
        const created = await guild.channels.create({
          name: category.name,
          type: 4
        });
        console.log(`✅ Created: ${category.name}`);
        
        // Create channels under this category
        for (const channel of category.channels) {
          await guild.channels.create({
            name: channel.name,
            type: 0,
            parent: created.id,
            topic: channel.desc
          });
          console.log(`   ✅ #${channel.name}`);
        }
      }
    }
    
    // Create standalone channels
    const standaloneChannels = [
      { name: CHANNELS.WELCOME, desc: "Welcome to our League of Legends community!" },
      { name: CHANNELS.RULES, desc: "Community rules and guidelines" },
      { name: CHANNELS.ANNOUNCEMENTS, desc: "Important community announcements" },
      { name: CHANNELS.INTRO, desc: "Introduce yourself to the community!" }
    ];
    
    for (const channel of standaloneChannels) {
      const existing = guild.channels.cache.find(c => c.name === channel.name && c.type === 0);
      if (!existing) {
        await guild.channels.create({
          name: channel.name,
          type: 0,
          topic: channel.desc
        });
        console.log(`✅ #${channel.name}`);
      }
    }
    
    // Post welcome message
    const welcomeChannel = guild.channels.cache.find(c => c.name === CHANNELS.WELCOME);
    if (welcomeChannel) {
      const welcomeEmbed = new EmbedBuilder()
        .setTitle("🏆 Welcome to League of Legends Community! 🏆")
        .setDescription("Welcome to the premier League of Legends community server!")
        .setColor(0x00AE86)
        .addFields(
          { name: "📢 Announcements", value: "Check #announcements for the latest news", inline: true },
          { name: "📜 Rules", value: "Please read #rules before chatting", inline: true },
          { name: "👋 Introductions", value: "Tell us about yourself in #introductions", inline: true }
        )
        .setFooter({ text: "GL HF! Don't forget to dodge less!" });
      
      await welcomeChannel.send({ embeds: [welcomeEmbed] });
      console.log("✅ Posted welcome message");
    }
    
    // Post rules
    const rulesChannel = guild.channels.cache.find(c => c.name === CHANNELS.RULES);
    if (rulesChannel) {
      const rulesEmbed = new EmbedBuilder()
        .setTitle("📜 Community Rules")
        .setDescription("Please follow these rules to keep our community great!")
        .setColor(0xFF9900)
        .addFields(
          { name: "1️⃣ Be Respectful", value: "Treat all members with respect. No harassment or hate speech.", inline: false },
          { name: "2️⃣ No Spam", value: "Don't spam messages or channels. Keep discussions on-topic.", inline: false },
          { name: "3️⃣ English Only", value: "Please use English in all public channels.", inline: false },
          { name: "4️⃣ No Spoilers", value: "Use spoiler tags for match results. No NSFW content.", inline: false },
          { name: "5️⃣ No Self-Promo", value: "Don't advertise without permission. No real money trading.", inline: false },
          { name: "6️⃣ Have Fun!", value: "Most importantly, enjoy your time here!", inline: false }
        )
        .setFooter({ text: "Stay hydrated and remember: it's just a game!" });
      
      await rulesChannel.send({ embeds: [rulesEmbed] });
      console.log("✅ Posted rules");
    }
    
    // Post info in announcements
    const announceChannel = guild.channels.cache.find(c => c.name === CHANNELS.ANNOUNCEMENTS);
    if (announceChannel) {
      const infoEmbed = new EmbedBuilder()
        .setTitle("🎮 Server Information")
        .setDescription("Everything you need to know about our community!")
        .setColor(0x00AE86)
        .addFields(
          { name: "🎯 Purpose", value: "A community for League of Legends players of all skill levels", inline: false },
          { name: "📢 Updates", value: "We post patch notes, esports news, and champion spotlights weekly", inline: false },
          { name: "💬 LFG", value: "Use #lfg-rankeds and #lfg-casuals to find teammates", inline: false },
          { name: "🆘 Support", value: "Have questions? Check #help-desk or ask a moderator!", inline: false }
        )
        .setFooter({ text: "Remember: /all chat is not real life. Stay positive!" });
      
      await announceChannel.send({ embeds: [infoEmbed] });
      console.log("✅ Posted server info");
    }
    
    console.log("\n🎉 League of Legends Fortune Bot - Fully Operational!");
    
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  
  // Simple command responses
  if (message.content === '!commands' || message.content === '!help') {
    const helpEmbed = new EmbedBuilder()
      .setTitle("🎮 Available Commands")
      .setColor(0x00AE86)
      .addFields(
        { name: "!commands / !help", value: "Show this help message", inline: true },
        { name: "!patch", value: "Get latest patch info", inline: true },
        { name: "!rank [summoner]", value: "Look up a summoner's rank", inline: true },
        { name: "!build [champion]", value: "Get recommended build for a champion", inline: true },
        { name: "!lfg", value: "Find teammates for ranked", inline: true },
        { name: "!rules", value: "Read the community rules", inline: true }
      )
      .setFooter({ text: "More commands coming soon!" });
    
    message.reply({ embeds: [helpEmbed] });
  }
  
  if (message.content === '!patch') {
    const patchEmbed = new EmbedBuilder()
      .setTitle("📢 Latest Patch Notes")
      .setDescription("Check out the latest League of Legends patch notes!")
      .setColor(0xFF9900)
      .addFields(
        { name: "Current Patch", value: "14.12", inline: true },
        { name: "Status", value: "Live on all servers", inline: true }
      )
      .setFooter({ text: "Visit leagueoflegends.com for full patch notes" });
    
    message.reply({ embeds: [patchEmbed] });
  }
  
  if (message.content.startsWith('!build ')) {
    const champion = message.content.slice(7);
    const buildEmbed = new EmbedBuilder()
      .setTitle(`🔧 ${champion} Build Guide`)
      .setDescription(`Recommended build for ${champion}`)
      .setColor(0x00AE86)
      .addFields(
        { name: "Mythic", value: "Check current meta for best options", inline: false },
        { name: "Tips", value: "Adapt your build based on enemy team comp", inline: false }
      )
      .setFooter({ text: "Note: Builds change based on meta. Stay updated!" });
    
    message.reply({ embeds: [buildEmbed] });
  }
  
  if (message.content === '!lfg') {
    message.reply("👋 Check out #lfg-rankeds or #lfg-casuals to find teammates!");
  }
  
  if (message.content === '!rules') {
    message.reply("📜 Check out #rules channel for our community guidelines!");
  }
});

client.login(TOKEN);
