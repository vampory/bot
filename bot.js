const Discord = require('discord.js'),
    client = new Discord.Client({sisableEveryone: true})
    console.log("Taino");
    
 const devs = ['427082011111325707' , '' , ''];
const adminprefix = "";
client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!devs.includes(message.author.id)) return;
      
  if (message.content.startsWith(adminprefix + 'v')) {
    client.user.setGame(argresult);
      message.channel.sendMessage(`**  ${argresult} تم تغيير الحاله الي :white_check_mark:**`)
  } else 
  if (message.content.startsWith(adminprefix + 'vv')) {
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.sendMessage(`**  ${argresult} تم تغيير الحاله الي :white_check_mark:**`)
  } else 
  if (message.content.startsWith(adminprefix + 'vvv')) {
  client.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.sendMessage(`**  ${argresult} تم تغيير الحاله الي :white_check_mark:**`)
  } else 
  if (message.content.startsWith(adminprefix + 'V')) {
    client.user.setGame(argresult, "https://www.twitch.tv/Taino#6004");
      message.channel.sendMessage(`**  ${argresult} تم تغيير الحاله الي :white_check_mark:**`)
  }
  });
client.login(process.env.BOT_TOKEN);

