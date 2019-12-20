# PeliBot

Fish enthusiastic bot for Pelican's Discord server 

---

## Adding the bot to the server

0. Create a discord server.
1. Add an application in the [developer's section](https://discordapp.com/developers/applications/) of discord's website.
2. Add a bot for the created application.
   - You may want to disable the 'public bot' flag.
   - Take note of the bot's private token.
3. In the OAuth2 section, select the 'bot' scope, and select the following permissions:
   - General Permissions: View Channels
   - Text Permissions: Send Messages
   - Voice Permissions: Connect
   - Voice Permissions: Speak
   - Voice Permissions: Use Voice Activity
4. Copy the generated link into a new browser tab to join the bot to your server.
5. Configure a private voice chat channel for the bot
6. Configure a text chat channel for your bot to listen to instructions
7. Enable Developer Mode in the appearance settings page of the discord application.

---

## Configuration

Copy the config.template.json file to config.json and replace the entries

```sh
cp config.template.json config.json
vim config.json
```

---

## Running the bot

```sh
npm install
npm start
```

## Docker

```sh
docker build -t mingodev/pelibot .
```

```sh
docker run \
  -it --rm \
  -v $PWD/config.json:/app/config.json \
  mingodev/pelibot
```
