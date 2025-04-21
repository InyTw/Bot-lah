<div align="center">
    <h1 id="Bot-lah">Bot-Lah</h1>

Creator: [InyTw](https://youtube.com/@InyTw87) 
<br>BoringSRV: [Discord](https://dsc.gg/boringsrv) || [YouTube](https://youtube.com/@Boringsrv-tw)

### Usage

> if you use vs code to run the bot, plz type:
```bash
node index.js
```
> or
```bash
node .
```

> if you want to stop the bot
> plz use `Ctrl+C`

### Discord-Bot Stutas & Activity

> go to index.js and find:

```js
client.once(Events.ClientReady, c => {
    client.user.setStatus('dnd'); //<---
    client.user.setActivity('Hi, im am Bot !', { type: ActivityType.online }); // <---
    console.log(' ');
    console.log(' ${c.user.tag} is online ');

});

```
#### Bot's Stutas
> Online
> idle
> dnd
> invisible

#### Bot's Activity
> watching
> Listening
> Streaming
> Playing
> Competing

### Change leave's & join's chat ID
> if you need to change chat id
> you can go to `index.js` and edit `// <== join's & leave's chat id`

```js
  // use chat id (JOIN)
  const channel = member.guild.channels.cache.get('-------------------'); // <== join's chat ID
  if (channel) {
    channel.send({ embeds: [welcomeEmbed] });
  }

// and 

    // use chat id (LEAVE)
  const channel = member.guild.channels.cache.get('-------------------'); // <== leave's chat ID
  if (channel) {
    channel.send({ embeds: [goodbyeEmbed] });
  }
```

### Discord Bot Token

> if you want to use your bot, plz go to [Discord developer Portal](https://discord.com/developers/applications) create a bot
> and go to `Bot` to get Token
> (if you can't create create a discord bot, this is a nice video
> [How to create a discord bot](https://youtu.be/zrNloK9b1ro?si=Khlie8ExWLNWhz5p))
> go to `config.json` to change `token`

### Discord Bot client ID

> go to [Discord developer Portal](https://discord.com/developers/applications)
> and go to `OAuth2` copy `ClientID`
> go to `config.json` to change `ClientID`

### Discord Guild ID
> go to your discord Guild 
> and `right click` your guild icon to copy `Guild ID`

# DiscordSRV (Minecraft Plugin)
> [Download DiscordSRV](https://www.spigotmc.org/resources/discordsrv.18494/)

### Usage
> download `DiscordSRV` in `plugins` folder
> and restart server (if you use PlugmanX, you can type `/plugman load DiscordSRV`)

>go to discordsrv's folder and edit `config.yml`
> go to [Discord developer Portal](https://discord.com/developers/applications) copy bot token
> paste the token

<h6>EX:</h6>

```yml
BotToken: "BOTTOKEN"

```

#### WARNINNG

> Don't touch pls
```yml
ConfigVersion: ${version}
```

### Chat ID

> go to your discord Guild and right click your MC-chat to copy Chat ID
> and go to discordsrv's folder and edit `config.yml`

```yml
# The first part of channel pairs is not the Discord channel name!
# Run "/discord reload" after changing this option to apply
Channels: {"global": "000000000000000000"}
```
### Console-Chat ID

> you can craeate a console-chat to copy Chat ID
> and go to discordsrv's folder and edit `config.yml`

```yml
# Console channel numerical ID (NOT NAME), leave blank to disable the console channel all together
DiscordConsoleChannelId: "000000000000000000" # <---
```

### Invitation link
> you can edit this

>EX:

```yml
DiscordInviteLink: "https://dsc.gg/boringsrv"
```

### Webhook Delivery

> Plz edit webhook to true in `config.yml` :

```yml
Experiment_WebhookChatMessageDelivery: true
Experiment_WebhookChatMessageUsernameFormat: "%displayname%"
Experiment_WebhookChatMessageFormat: "%message%"
Experiment_WebhookChatMessageUsernameFromDiscord: true
Experiment_WebhookChatMessageAvatarFromDiscord: true
Experiment_WebhookChatMessageUsernameFilters: {}
```
### Game Information
> (You can do Not set this, bcs you have use `index.js` to run Stutas & Activity)


<br>
<br>
<h6>© 2025 InyTw, BoringSrv power</h6>
</div>