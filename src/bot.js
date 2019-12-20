const Discord = require('discord.js');
const package = require('../package.json');
const config = require('../config.json');
const data = require('./data');
const logger = require('./logger');

const bot = new Discord.Client();

const commands = data.commands;
const errors = data.errors;
const globalCooldown = config.globalCooldown;
const botTextChannelID = config.textChannelId;
const botVoiceChannelID = config.voiceChannelId;

let isReady = true;

function startCooldown (cooldown = globalCooldown) {
    if (isReady) isReady = false;
    setTimeout(() => isReady = true, cooldown);
}

function checkCooldown (channel) {
    if (!isReady) channel.send(errors['cooldown']);
    return isReady;
}

function returnToNest () {
    // Since we can't keep track of the bot's current channel, we join a given channel and leave it.
    // We can make the channel private to make sure users don't get to hear alerts when the bot joins and leaves the channel.
    const channel = bot.channels.get(botVoiceChannelID);
    channel.join();
    channel.leave();
}

function getCommandsMap() {
    return Object.entries(commands)
        .map(obj => ({ key: obj[0], value: obj[1] }))
}

function getHelpText() {
    const helpHeader = 'Squawk! Here is a list of my available commands: \n\n';
    const publicCommandsList = getCommandsMap()
        .filter(cmd => !cmd.value.hasOwnProperty('secret'))
        .map(cmd => `${cmd.key} : ${cmd.value.desc}`)
        .join('\n');

    const helpMessage = `${helpHeader}${publicCommandsList}`;
    return helpMessage;
}

function getRandomCommand() {
    const validCommands = getCommandsMap()
        .filter(cmd => cmd.value.audio !== null)
        .map(cmd => cmd.key);

    if (validCommands.length > 0 ) return validCommands[Math.floor(Math.random() * validCommands.length)];
}

function playSoundCommand(userCommand, textChannel, voiceChannel) {
    // Check cooldown
    if (!checkCooldown(textChannel)) return;

    isReady = false;
    const cmd = commands[userCommand];
    const audioFile = cmd.audio;
    const audioVolume = cmd.volume !== 'undefined'
        ? commands[userCommand].volume
        : 1;

    voiceChannel.join().then( connection =>
    {
        const dispatcher = connection.play('./assets/sounds/' + audioFile, { volume : audioVolume });
        dispatcher.on("end", returnToNest);
    }).catch(err => logger.error(err));
    startCooldown();
}


bot.on('message', message => {
    // Check if message is a DM
    if (message.guild === null) return;

    let userCommand = message.content;
    const textChannel = message.channel;
    const voiceChannel = message.member.voice.channel;
    const isInVoiceChannel = typeof voiceChannel !== 'undefined' && voiceChannel !== null;

    // Check if message is from PeliBot Channel
    if (textChannel.id !== botTextChannelID) return;

    // Check if message is an intended command and not from a bot
    if (userCommand.charAt(0) !== '!' || message.author.bot) return;

    // Not a valid command
    if (!(userCommand in commands)) {
        const errorMessage = errors['not_a_command'];
        message.channel.send(errorMessage);
        return;
    }

    // Not in a voice channel
    if (!isInVoiceChannel) {
        const errorMessage = errors['not_in_a_channel'];
        message.channel.send(errorMessage);
        return;
    }

    // Handle commands without audio
    if (userCommand === '!halp') {
        const messageToSend = getHelpText();
        message.channel.send(messageToSend);
        return;
    }

    if (userCommand === '!stahp' && isInVoiceChannel) {
        returnToNest();
        return;
    } else if (userCommand === '!sthap' && !isInVoiceChannel) {
        const errorMessage = errors['not_in_voice_channel'];
        message.channel.send(errorMessage);
        return;
    }

    if (userCommand === '!rng') {
        userCommand = getRandomCommand();
    }

    playSoundCommand(userCommand, textChannel, voiceChannel);
});

function startBot() {
    logger.info('Authenticating bot...')
    bot.login(config.token)
        .then(() => logger.info('Success, awaiting commands...'))
        .catch(err => logger.error(err));
}

logger.info(`Running ${package.name} ${package.version}, ${package.description}`);
startBot();
