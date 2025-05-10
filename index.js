//----------------------------------------------------//
//       || GitHub: github.com/InyTw/Bot-lah ||       //
//               || Creator: InyTw ||                 //
//          || YouTube: youtube.com/@InyTw ||         //
//----------------------------------------------------//

const { Client, Events, GatewayIntentBits, ActivityType, EmbedBuilder, InteractionCollector } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { token } = require('./config.json');

//---------------------------------------------------//
//           || 建立一個新的 Client 實例 ||            //
//---------------------------------------------------//
//             GatewayIntentBits.Guilds,
//          GatewayIntentBits.GuildMembers,
//         GatewayIntentBits.GuildMessages,
//         GatewayIntentBits.MessageContent,
//---------------------------------------------------//

const client = new Client({
  intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
});

//----------------------------------------------------//
//            || 用BotToken登入Discord ||             //
//---------------------------------------------------//

client.login(token);

//---------------------------------------------------//
//                || 設置機器人狀態 ||                 //
//---------------------------------------------------//
//               online:設置狀態為在線
//               idle:設置狀態為閒置
//              dnd:設置狀態為請勿打擾
//          invisible:設置狀態為離線（隱形)
//---------------------------------------------------//
//             || 設置機器人這在做的事 ||              //
//--------------------------------------------------//
//         watching:將機器人的行為設置為正在看
//         Listening:將機器人的行為設置為正在聽
//        Streaming:將機器人的行為設置為正在直播
//          Playing:將機器人的行為設置為正在玩
//         Competing:將機器人的行為設置為競爭
//             client.user.setActivity
// ('前綴後面的文字', { type: ActivityType.Watching })
//---------------------------------------------------//
//               || 'Bot Online'通知 ||              //
//---------------------------------------------------//

client.once(Events.ClientReady, c => {
    client.user.setStatus('dnd');
    client.user.setActivity('Pornhub.com', { type: ActivityType.Watching });
    console.log(' ');
    console.log(` ${c.user.tag} is online `);

});

client.commands = new Collection();

// 讀取指令
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// 指令處理
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: '執行指令時出錯。', ephemeral: true });
  }
});

//welcome message catch
const fs = require('fs');
const path = require('path');
const welcomePath = path.join(__dirname, 'data', 'welcome.json');

//
client.on('guildMemberAdd', member => {
  const welcomeEmbed = new EmbedBuilder()
  .setColor('#00FF00')
  .setTitle('有人進來了!!!')
  .setDescription(`歡迎 ${member.user} 加入了伺服器`)
  .setThumbnail(member.user.displayAvatarURL())
  .setTimestamp();

  //抓取頻道ID 來傳送訊息
  const channel = member.guild.channels.cache.get(guildConfig.channelId);
  if (channel) {
    channel.send({ embed: [welcomeEmbed] })
  }
});

client.on('guildMemberRemove', member => {
  const goodbyeEmbed = new EmbedBuilder()
  .setColor('#FF0000')
  .setTitle('有人離開了!!!')
  .setDescription(`${member.user} 離開了伺服器`)
  .setTimestamp();

  //抓取頻道ID 來傳送訊息
  const channel = member.guild.channels.cache.get(guildConfig.channelId);
  if (channel) {
    channel.send({ embed: [goodbyeEmbed] })
  }
});

client.on('channelPinsUpdate', (channel, data) => {});