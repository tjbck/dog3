require("dotenv").config();
const {
  Client,
  Events,
  EmbedBuilder,
  GatewayIntentBits,
  Partials,
} = require("discord.js");

const { insertMessage } = require("./db");

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageTyping,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  console.log(
    `${message.author.username} ${message.author.id}: ${message.content}`
  );

  if (message.mentions.has(client.user)) {
    message.reply("Yes, you mentioned me?");
  }

  if (
    message.member.roles.cache.some(
      (role) => role.name === "maintainer" || role.name === "contributors"
    )
  ) {
    console.log(message.member.roles.cache);
    const result = await insertMessage(
      message.author.username,
      message.content
    );
    console.log(result);
  }
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN || "token");
