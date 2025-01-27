const { Client, Events, GatewayIntentBits, ActivityType, EmbedBuilder } = require('discord.js');
const { token, id } = require('./config.json');

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
//             || 'Bot Online'通知 ||            //
//---------------------------------------------------//

client.once(Events.ClientReady, c => {
    client.user.setStatus('dnd');
    client.user.setActivity('Pronhub.com', { type: ActivityType.Watching });
    console.log(' ');
    console.log(' ');
    console.log('--------------------------');
    console.log(` >> ${c.user.tag} online <<`)
    console.log('--------------------------');
    console.log(' ');
    console.log(' ');

});

//---------------------------------------------------//
//                     || 公告 ||                     //
//---------------------------------------------------//

client.on(Events.MessageCreate, (message) => {
  if (message.content === '!') {
 message.channel.send
 (' ');
}
});

//---------------------------------------------------//
//                 || 機器人自動回復 ||                //
//---------------------------------------------------//

  client.on(Events.MessageCreate, (message) => {
    if (message.content === ':P') {
       message.channel.send('lol');
     }
    });

  client.on(Events.MessageCreate, (message) => {
    if (message.content === '💀') {
     message.channel.send('💀💀\nschool = skull');
   }
  });

  client.on('messageCreate', (message) => {
    // Ignore bot messages
    if (message.author.bot) return;
  });
  
  client.on(Events.MessageCreate, (message)=> {
      if (message.content === "030") (
          message.reply("O.o")
      );
  });
  
  client.on(Events.MessageCreate, (message)=> {
    if (message.content === "$help") (
        message.reply("# Help\n"+
          "**` $srv-info `**  : **server's IP and version**"
        )
    );
  });
  
  client.on(Events.MessageCreate, (message)=> {
    if (message.content === "$srv-info") (
        message.reply("# SRV-info\n```js\nIP: 'xaiomi.minecraft.best'\n```\n```js\nversion: '1.21'\n```")
    );
  });

//----------------------------------------------------//
//              Member join and leave                 //
//----------------------------------------------------//

client.on('guildMemberAdd', member => {
  const welcomeEmbed = new EmbedBuilder()
    .setColor('#00FF00')
    .setTitle('有人加入了')
    .setDescription(`歡迎🙌 ${member.user}`)
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp();

  // 使用頻道ID發送訊息
  const channel = member.guild.channels.cache.get('1323289509655478304'); // 加入通知頻道ID
  if (channel) {
    channel.send({ embeds: [welcomeEmbed] });
  }
});

// 成員退出伺服器時
client.on('guildMemberRemove', member => {
  const goodbyeEmbed = new EmbedBuilder()
    .setColor('#FF0000')
    .setTitle('有人退出了！！！')
    .setDescription(`${member.user} \n**離開了我們(┬┬﹏┬┬)**`)
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp();

    // 使用頻道ID發送訊息
    const channel = member.guild.channels.cache.get('1323289509655478304'); // 加入通知頻道ID
    if (channel) {
      channel.send({ embeds: [goodbyeEmbed] });
    }
  });

client.on('channelPinsUpdate', (channel, data) => {});

function msToHMS(ms) {
  let seconds = ms / 1000;
  const hours = parseInt( seconds / 3600 );
  seconds = seconds % 3600;
  const minutes = parseInt( seconds / 60 );
  seconds = seconds % 60;
  return(`${hours}:${minutes}:${~~(seconds)}`);
}