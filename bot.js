const GOOGLE_API_KEY = "AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8"
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const Discord = require("discord.js");
const client = new Discord.Client();
const youtube = new YouTube(GOOGLE_API_KEY);

var prefix = "!";
//By Request of [ function ]
var color = new Discord.RichEmbed().setColor('#000000').setColor('#36393e')
function e(message, args) {
	var embed = new Discord.RichEmbed()
	.setColor(color.color)
	.setDescription(args)
	.setFooter(`By Request of ${message.author.username}`);
	message.channel.sendEmbed(embed);
};
//Errors [ function ]
function err(message, args) {
	var embed = new Discord.RichEmbed()
	.setColor(color.color)
	.setAuthor(args, "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Feedbin-Icon-error.svg/1000px-Feedbin-Icon-error.svg.png")
	message.channel.sendEmbed(embed);
};
//Requested by [ function ]
function ee(message, args) {
	var embed = new Discord.RichEmbed()
	.setColor(color.color)
	.setAuthor(args)
	.setFooter(`Requested by ${message.author.username}`);
	message.channel.sendEmbed(embed);
};
//Left the voice channel [ function ] ,-,
function L(message, args) {
	var embed = new Discord.RichEmbed()
	.setColor(color.color)
	.setDescription(args)
	.setFooter(`By Request of ${message.author.username}`);
	message.channel.sendEmbed(embed);
}
//Current volume [ function ]
function V(message, args) {
	var embed = new Discord.RichEmbed()
	.setColor(color.color)
	.setAuthor(args, "https://www.iconsdb.com/icons/preview/red/volume-up-4-xxl.png")
	message.channel.sendEmbed(embed);
}
// For the skip command
function S(message, args) {
	var embed = new Discord.RichEmbed()
	.setColor(color.color)
	.setDescription(args)
	message.channel.sendEmbed(embed);
};
function VS(message, args) {
	var embed = new Discord.RichEmbed()
	.setColor(color.color)
	.setDescription(args)
	.setFooter("Requires Another Vote.")
	message.channel.sendEmbed(embed);
};
function Vs(message, args) {
	var embed = new Discord.RichEmbed()
	.setColor(color.color)
	.setAuthor(args, "https://www.iconsdb.com/icons/preview/red/volume-up-4-xxl.png")
	message.channel.sendEmbed(embed);
};
const queue = new Map();
var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
client.on('message', async message => { 
	if (message.author.bot) return undefined;
	if (!message.content.startsWith(prefix)) return undefined;
	const args = message.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const voiceChannel = message.member.voiceChannel;
	let command = message.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length)
	if (message.channel.type !== 'text') return;
	const serverQueue = queue.get(message.guild.id);
	message.guild.setRegion("eu-central")//
	if (command === 'play' || command === 'p' || command === 'search' || command === "ply") {
		if (!voiceChannel) return err(message,`You Should Be in A Voice Channel To Use This Command.`);
		if (message.guild.members.get(client.user.id).voiceChannel) {
			if (message.guild.members.get(message.member.id).voiceChannel.id !== message.guild.members.get(client.user.id).voiceChannel.id) return err(message , `You Should Be in My Voice Channel To Use My Commands.`);
        };
		if (!args[1]) return err(message, `You should To insert A song name or YouTube URL.`)
		const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
		const validate = await ytdl.validateURL(args[1]);
		if (regexp.test(args[1]) && !validate && !url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) return err(message, `You should insert A valid URL.`);
		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id); 
                await handleVideo(video2, message, voiceChannel, true); 
            }
			e(message,`**${playlist.title}**, has been added to the queue`)
		}else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 31);
					if (!videos[0]) return err(message, `Cannot find Any Results.`);
					var index = 0;
					var pages = 1;
					var msgg = "";
					var takoota = new Discord.RichEmbed()
					.setAuthor("Search results..", 'https://cdn.discordapp.com/attachments/480852478196187138/483165667877453834/20180826_094749.png')
					.setColor(color.color)
					.setThumbnail("https://www.denverlibrary.org/sites/dplorg/files/2018/02/youtube-344105_640.png")
					.setDescription(`${videos.map(video2 => `${++index}. **${video2.title}**\n`).slice(0,10).join('\n')}`)
					.setFooter("Page 1 of 3");
					message.channel.send({embed : takoota}).then(async msg1 => {
						msgg=msg1.id
						await msg1.react('◀');
						await msg1.react('▶');
						let e = msg1.createReactionCollector((reaction, user) => reaction.emoji.name === '◀' && user.id === message.author.id, { time: 60000 });
						let t = msg1.createReactionCollector((reaction, user) => reaction.emoji.name === '▶' && user.id === message.author.id, { time: 60000 });
						t.on("collect",async () => { 
							if (pages == 1) {
								pages+=1
							index = 0;
							var takoota = new Discord.RichEmbed()
							.setAuthor("Search results..", 'https://cdn.discordapp.com/attachments/480852478196187138/483165667877453834/20180826_094749.png')
							.setColor(color.color) 
							.setThumbnail("https://www.denverlibrary.org/sites/dplorg/files/2018/02/youtube-344105_640.png")
							.setDescription(`${videos.map(video2 => `${++index}. **${video2.title}**\n`).slice(10,20).join('\n')}`)
							.setFooter("Page 2 of 3");
							msg1.edit({embed : takoota});
							} else if (pages == 2) {
								pages+=1
								var takoota = new Discord.RichEmbed()
							.setAuthor("Search results..", 'https://cdn.discordapp.com/attachments/480852478196187138/483165667877453834/20180826_094749.png')
							.setColor(color.color) 
							.setThumbnail("https://www.denverlibrary.org/sites/dplorg/files/2018/02/youtube-344105_640.png")
							.setDescription(`${videos.map(video2 => `${index++ - 30}. **${video2.title}**\n`).slice(20,30.5).join('\n')}`)
							.setFooter("Page 3 of 3");
							msg1.edit({embed : takoota});
							};
						});
						e.on("collect", async () => {
							index = 0;
							if (pages == 2) {
								pages-=1
							var takoota = new Discord.RichEmbed()
							.setAuthor("Search results..", 'https://cdn.discordapp.com/attachments/480852478196187138/483165667877453834/20180826_094749.png')
							.setColor(color.color)
							.setThumbnail("https://www.denverlibrary.org/sites/dplorg/files/2018/02/youtube-344105_640.png")
							.setDescription(`${videos.map(video2 => `${++index}. **${video2.title}**\n`).slice(0,10).join('\n')}`)
							.setFooter("Page 1 of 3");
							msg1.edit({embed : takoota})
							} else if (pages == 3) {
								pages-=1
								var takoota = new Discord.RichEmbed()
							.setAuthor("Search results..", 'https://cdn.discordapp.com/attachments/480852478196187138/483165667877453834/20180826_094749.png')
							.setColor(color.color) 
							.setThumbnail("https://www.denverlibrary.org/sites/dplorg/files/2018/02/youtube-344105_640.png")
							.setDescription(`${videos.map(video2 => `${++index}. **${video2.title}**\n`).slice(10,20).join('\n')}`)
							.setFooter("Page 2 of 3");
							msg1.edit({embed : takoota});
							}
						})
						
					});
					try {
						var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 31 && msg2.author.id == message.author.id, {
							maxMatches: 1,
							time: 60000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return;
					}
					response.first().delete();
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
					var msg1 = message.channel.messages.get(msgg);
					if (!msg1) return;
					msg1.delete();
				} catch (err) {
					console.error(err);
					return;
				}
			}}
				const serverQueue = queue.get(message.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: video.title,
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 100,
			playing: true,
			loop : false,
			vote : []
		};
		queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0], message);
		} catch (error) {
			console.error(`${error}`);
			queue.delete(message.guild.id);
			return;
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) return;
		await e(message, `**${song.title}**, has been added to the queue`)
	};
	
	return undefined;
	async function handleVideo(video, message,voiceChannel){
						const serverQueue = queue.get(message.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: video.title,
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 100,
			playing: true,
			loop : false
		};
		queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0], message);
		} catch (error) {
			console.error(`${error}`);
			queue.delete(message.guild.id);
			return;
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) return;
		await e(message, `**${song.title}**, has been added to the queue`)
	};
	return undefined;
	}
	} else if (command === 'skip' || command === 's' || command === 'ski' || command === 'sk') {
		if (!message.member.voiceChannel) return err(message,`You Should Be in A Voice Channel To Use This Command.`);
		if (message.guild.members.get(message.member.id).voiceChannel.id !== message.guild.members.get(client.user.id).voiceChannel.id) return err(message , `You Should Be in My Voice Channel To Use My Commands.`);
		if (!serverQueue) return err(message,`You Should Play Something To Use This Command.`);
		if (serverQueue.songs.length == 1) return err(message, "Only 1 song is Queued.")
		if (serverQueue.vote.includes(message.author.id)) return err(message, `You Already Voted To skip.`);
		serverQueue.vote.push(message.author.id)
		var allusers = message.guild.members.filter(m => m.voiceChannel).size;
		var required = allusers/2
		if (required<=serverQueue.vote.length) {
			if (serverQueue.loop == true)await serverQueue.songs.shift();
			await serverQueue.connection.dispatcher.end('Skip command has been used!');
			await S(message, `**${serverQueue.songs[0].title}**, has been skipped`);
		} else {
			VS(message, `**${message.author.username}**, has been voted to skip`)
		}
		return undefined;
	} else if (command === 'stop' || command === 'st' || command === 'sto') {
	if (!serverQueue) return err(message,`You Should Play Something To Use This Command.`);

	if (!message.member.voiceChannel) return err(message,`You Should Be in A Voice Channel To use This Command.`);		
		if (message.guild.members.get(message.member.id).voiceChannel.id !== message.guild.members.get(client.user.id).voiceChannel.id) return err(message , `You Should Be in My Voice Channel To Use My Commands.`)
		e(message, `Okey, Music has been stopped`);
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
		return undefined;
	} else if (command === "leave" || command === 'disconnect' || command === 'l') {
		if (!message.guild.members.get(client.user.id).voiceChannel) return;
		if (message.guild.members.get(message.member.id).voiceChannel.id !== message.guild.members.get(client.user.id).voiceChannel.id) return err(message , `You Should Be in My Voice Channel To Use My Commands.`);
		if (serverQueue) serverQueue.songs = [];
		if (serverQueue) serverQueue.connection.dispatcher.end('leave command has been used!');
		message.member.voiceChannel.join();
		message.member.voiceChannel.leave();
		L(message, `:door: I have disconnected from ${message.guild.members.get(client.user.id).voiceChannel.name}`);

	} else if (command === 'volume' || command === 'vol' || command === 'v') {
		if (!serverQueue) return err(message,`You Should Play Something To Use This Command.`);
		if (!message.member.voiceChannel) return err(message,`You Should Be in A Voice Channel To Use This Command.`);
		if (message.guild.members.get(message.member.id).voiceChannel.id !== message.guild.members.get(client.user.id).voiceChannel.id) return err(message , `You Should Be in My Voice Channel To Use My Commands.`)
		if (!args[1]) return V(message,`The current volume is ${serverQueue.volume}%`);
		args[1] = parseInt(args[1]);
		if (args[1] > 100 || args[1]<2) return err(message, `Only allowed from 2 - 100`)
		if (isNaN(args[1])) return err(message, `Only numbers are allowed.`)
		if (args[1] == serverQueue.volume) return err(message, `My Volume is already ${serverQueue.volume}%`)
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 250);
		return Vs(message, `Volume Successfully Changed to ${args[1]}%`);
	} else if (command === 'queue' || command === 'q' || command === "qu" || command === 'que') {
		if (!serverQueue) return err(message,`You Should Play Something To Use This Command.`);
		else if (!message.member.voiceChannel) return err(message,`You Should Be in A Voice Channel To Use This Command.`);
		else if (message.guild.members.get(message.member.id).voiceChannel.id !== message.guild.members.get(client.user.id).voiceChannel.id) return err(message , `You Should Be in My Voice Channel To Use My Commands.`)
		else {
		var y = 0;
		var embed = new Discord.RichEmbed()
		embed.setColor(color.color);
		embed.setAuthor(`Now playing 🎶 ${serverQueue.songs[0].title}`)
		embed.setURL(serverQueue.songs[0].url)
        if (serverQueue.songs.length <=1) return message.channel.send({embed :embed});
        var str = `${serverQueue.songs.map(song => `${y++}. [${song.title}](${song.url})\n`).slice(1,11).join("\n")}\n\n`;
        var embed = new Discord.RichEmbed()
        .setColor(color.color)
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setThumbnail("https://media.discordapp.net/attachments/492975144147615744/493028296699936777/1537617500423.png")
        .setDescription(str);
        if ((serverQueue.songs.length-10) > 0) embed.setFooter(`And ${serverQueue.songs.length-10} More..`);
        message.channel.send({embed : embed});
		}
	} else if (command === 'pause' || command === 'pa' || command === 'pau' || command === 'paus') {
		if (!serverQueue) return err(message,`You Should Play Something To Use This Command.`);
		if (serverQueue && serverQueue.playing) {
		if (message.guild.members.get(message.member.id).voiceChannel.id !== message.guild.members.get(client.user.id).voiceChannel.id) return err(message , `You Should Be in My Voice Channel To Use My Commands.`)
		if (!message.member.voiceChannel) return ee(message,`You Should Be in A Voice Channel To Use This Command.`);
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			e(message, `**${serverQueue.songs[0].title}**, has been paused`);
			return;
		}
	} else if (command === 'resume' || command === 'r' || command === 'continue' || command === "res") {
		if (!serverQueue) return err(message,`You Should Play Something To Use This Command.`);
		if (serverQueue && !serverQueue.playing) {
		if (message.guild.members.get(message.member.id).voiceChannel.id !== message.guild.members.get(client.user.id).voiceChannel.id) return err(message , `You Should Be in My Voice Channel To Use My Commands.`)
		if (!message.member.voiceChannel) return err(message,`You Should Be in A Voice Channel To Use This Command.`);
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			e(message, `**${serverQueue.songs[0].title}**, has been resumed`);
			return;
	};
	} else if (command === 'repeat' || command === 'rpt') {
		if (!serverQueue) return err(message,`You Should Play Something To Use This Command.`);
		if (serverQueue) {
		if (message.guild.members.get(message.member.id).voiceChannel.id !== message.guild.members.get(client.user.id).voiceChannel.id) return err(message , `You Should Be in My Voice Channel To Use My Commands.`)
		if (!message.member.voiceChannel) return ee(message,`You Should Be in A Voice Channel To Use This Command.`);
			serverQueue.songs.splice(1, 0, serverQueue.songs[0])
			e(message, `**${serverQueue.songs[0].title}**, Will be repeated`);
			return undefined;
		}
	} else if (command === 'loop' || command === 'lo') {
			if (!serverQueue) return err(message, `You Should Play Something To Use This Command.`);
			if (serverQueue && serverQueue.playing) {
				if (!message.member.voiceChannel) return err(message,`You Should Be in A Voice Channel To Use This Command.`);
				if (message.guild.members.get(message.member.id).voiceChannel.id !== message.guild.members.get(client.user.id).voiceChannel.id) return err(message , `You Should Be in My Voice Channel To Use My Commands.`)
				if (serverQueue.loop == false) {
					serverQueue.loop = true;
					e(message, `**${serverQueue.songs[0].title}**, will be looped`)
				} else if (serverQueue.loop == true) {
					serverQueue.loop = false;
					e(message, `**${serverQueue.songs[0].title}**, will not be looped again`)
				};
			}
		}
});


function play(guild, song, message) {
	setTimeout(function(){
		const serverQueue = queue.get(guild.id);
		if (!song) {
			serverQueue.voiceChannel.leave();
			serverQueue.voiceChannel.join();
			queue.delete(guild.id);
			var embed = new Discord.RichEmbed()
			embed.setColor(color.color)
			embed.setDescription(`:checkered_flag: **${message.guild.name}** Queue has been finished.`)
			serverQueue.textChannel.send(embed)
			return;
		};
		if (!serverQueue.songs[0]){
			serverQueue.voiceChannel.leave();
			serverQueue.voiceChannel.join();
			queue.delete(guild.id);
			return;
		};
		console.log(serverQueue.songs);
		serverQueue.vote = [];
		const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			if (serverQueue.loop == true) {
				play(guild, serverQueue.songs[0], message);
				return undefined;
			};
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0], message);
		})
		.on('error', error => console.error(error));
		dispatcher.setVolumeLogarithmic(serverQueue.volume / 250);
		var embed = new Discord.RichEmbed()
		embed.setColor(color.color);
		embed.setAuthor(`Now playing 🎶 ${serverQueue.songs[0].title}`)
		embed.setURL(serverQueue.songs[0].url)
		serverQueue.textChannel.send(embed)
	},10);
}

client.login(process.env.BOT_TOKEN);


