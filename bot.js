const Discord = require('discord.js'),
    bot = new Discord.Client({sisableEveryone: true})
    console.log("Taino");
bot.on('guildMemberAdd', member => {
const mohamed= member.guild.channels.get("488013994410377226");
if(!mohamed) return;
if(mohamed) {
setTimeout(() => mohamed.send(`**Welcome to Pax ..**`), 4000)        
}
});
 
const client = new Discord.Client();




 const devs = ['475070652727033858' , '427082011111325707' , ''];
const adminprefix = "!";
client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!devs.includes(message.author.id)) return;
      
  if (message.content.startsWith(adminprefix + 'ply')) {
    client.user.setGame(argresult);
      message.channel.sendMessage(`**  ${argresult} تم تغيير الحاله الي :white_check_mark:**`)
  } else 
  if (message.content.startsWith(adminprefix + 'wt')) {
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.sendMessage(`**  ${argresult} تم تغيير الحاله الي :white_check_mark:**`)
  } else 
  if (message.content.startsWith(adminprefix + 'ls')) {
  client.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.sendMessage(`**  ${argresult} تم تغيير الحاله الي :white_check_mark:**`)
  } else 
  if (message.content.startsWith(adminprefix + 'st')) {
    client.user.setGame(argresult, "https://www.twitch.tv/ImD3s_x");
      message.channel.sendMessage(`**  ${argresult} تم تغيير الحاله الي :white_check_mark:**`)
  }
  });
bot.login(process.env.BOT_TOKEN);

