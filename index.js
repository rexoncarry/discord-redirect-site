const { Client, Intents } = require('discord.js');
const express = require('express');
require('dotenv').config();

// Bot token from Discord Developer Portal
const TOKEN = process.env.BOT_TOKEN;

// Initialize Discord bot
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
});

// On bot ready
client.once('ready', () => {
    console.log(`${client.user.tag} is online!`);
});

// Handle "!user" command
client.on('messageCreate', async (message) => {
    if (message.content === '!user') {
        const members = await message.guild.members.fetch();
        const userList = members.map((member) => member.user.tag).join('\n');
        message.channel.send(`Here are the users in this server:\n\`\`\`${userList}\`\`\``);
    }
});

// Login bot
client.login(TOKEN);

// Simple Express app for keeping the bot alive
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot is running!');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
