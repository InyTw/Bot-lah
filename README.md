<div align="center">
    <h1 id="Bot-lah">Bot-Lah</h1>

Creator: [InyTw](https://youtube.com/@InyTw87)

## Usage

> if you use vs code to turn on the bot, plz type:
```bash
node index.js

# or

node .
```
## Change leave's & join's chat ID
> if you need change chat id
> you can go to `index.js` and edit `// <== join's & leave's chat id`

```js
  // use chat id (JOIN)
  const channel = member.guild.channels.cache.get('1363521108996919306'); // <== join's chat ID
  if (channel) {
    channel.send({ embeds: [welcomeEmbed] });
  }

// and 

    // use chat id (LEAVE)
  const channel = member.guild.channels.cache.get('1363521108996919306'); // <== leave's chat ID
  if (channel) {
    channel.send({ embeds: [goodbyeEmbed] });
  }
```

</div>