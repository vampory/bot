const Discord = require('discord.js');

const Util = require('discord.js');

const getYoutubeID = require('get-youtube-id');

const fetchVideoInfo = require('youtube-info');

const YouTube = require('simple-youtube-api');

const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");

const queue = new Map();

const ytdl = require('ytdl-core');

const fs = require('fs');

const gif = require("gif-search");

const bot = new Discord.Client({disableEveryone: true});

const prefix = "!";
/////////////////////////
////////////////////////
bot.on('message', function(message) {
    const myID = "427082011111325707";
    let args = message.content.split(" ").slice(1).join(" ");
    if(message.content.startsWith(prefix + "setname")) {
                if(message.author.id !== '427082011111325707') return;
            if(!args) return message.reply('اكتب الحالة اللي تريدها.');
        bot.user.setUsername(args);
        message.channel.send(':white_check_mark: Done!').then(msg => {
    
        });
} else if(message.content.startsWith(prefix + "stream")) {
                if(message.author.id !== '427082011111325707') return;
            if(!args) return message.reply('اكتب الحالة اللي تريدها.');
        bot.user.setGame(args , 'https://twitch.tv/6xlez1');
        message.channel.send(':white_check_mark: Done!').then(msg => {
        
        });
    } else if(message.content.startsWith(prefix + "ply")) {
                        if(message.author.id !== '427082011111325707') return;
            if(!args) return message.reply('اكتب الحالة اللي تريدها.');
        bot.user.setGame(args);
        message.channel.send(':white_check_mark: Done!').then(msg => {
   
        });
    } else if(message.content.startsWith(prefix + "listen")) {
                        if(message.author.id !== '427082011111325707') return;
            if(!args) return message.reply('اكتب الحالة اللي تريدها.');
        bot.user.setActivity(args, {type:'LISTENING'});
        message.channel.send(':white_check_mark: Done!').then(msg => {
        
        });
    } else if(message.content.startsWith(prefix + "watch")) {
                        if(message.author.id !== '427082011111325707') return;
            if(!args) return message.reply('اكتب الحالة اللي تريدها.');
        bot.user.setActivity(args, {type:'WATCHING'});
        message.channel.send(':white_check_mark: Done!').then(msg => {
       
        });
    } else if(message.content.startsWith(prefix + "setavatar")) {
                        if(message.author.id !== '427082011111325707') return;
        bot.user.setAvatar(args);
        message.channel.send(':white_check_mark: Done!').then(msg => {
                if(!args) return message.reply('اكتب الحالة اللي تريدها.');
       
        });
    }
});
/////////////////////
/////////////////////

bot.login(process.env.BOT_TOKEN);

