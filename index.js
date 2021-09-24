require('dotenv').config(); //initialize dotenv
const { Client, Intents, Collection } = require('discord.js');
const botCommands = require('./commands');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();

Object.keys(botCommands).map(key => {
  client.commands.set(botCommands[key].name, botCommands[key]);
});


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();
  console.info(`Called command: ${command}`);

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('there was an error trying to execute that command!');
  }
})

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token