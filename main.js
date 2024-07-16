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

  console.log(client.user.id);
  console.log(
    `${message.author.username} ${message.author.id}: ${message.content}`
  );

  if (message.mentions.has(client.user)) {
    if (
      message.member.roles.cache.some(
        (role) => role.name === "maintainer" || role.name === "contributors"
      )
    ) {
      let messageContent = message.content;
      messageContent = messageContent.replace(`<@${client.user.id}>`, "");
      messageContent = messageContent.trim();

      let item = {
        username: message.author.username,
        message: messageContent,
        metadata: {
          channel: message.channel.name,
          timestamp: message.createdTimestamp,
        },
      };

      if (message.reference) {
        const repliedMessage = await message.channel.messages.fetch(
          message.reference.messageId
        );

        item["reply"] = {
          username: repliedMessage.author.username,
          message: repliedMessage.content,
          metadata: {
            channel: repliedMessage.channel.name,
            timestamp: repliedMessage.createdTimestamp,
          },
        };
      }
    }

    const result = await insertMessage(item);
    console.log(result);
    message.reply("Message saved to database");
  }
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN || "token");
