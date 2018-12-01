

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', async msg=> {
  if (msg.content === 'امر السبام') {

setInterval(function() {
msg.channel.send(` 0823t7cawfawfa 1`);
});
}
});
 
  
client.login(process.env.BOT_TOKEN);

