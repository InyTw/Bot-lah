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

<br>
<br>
<h6>© 2025 InyTw, BoringSrv power</h6>
</div>