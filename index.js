//----------------------------------------------------//
//     || Minecraft <===> Discord Server Bot ||       //
//----------------------------------------------------//
//                 Creator: InyTww                    //
//         Discord:https://dsc.gg/discordmcbot        //
//----------------------------------------------------//

const { Client, Events, GatewayIntentBits, ActivityType, EmbedBuilder, SlashCommandBuilder, Role } = require('discord.js');
const { token, id } = require('./config.json');

//---------------------------------------------------//
//           || 建立一個新的 Client 實例 ||            //
//---------------------------------------------------//
//                     預設如下
//             (Discord Developer Portal的
//             Privileged Gateway Intents
//             下面的三個東西都要開啟才行):
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
//            預設: client.login(token);
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
//             || 'Bot was Online'通知 ||            //
//---------------------------------------------------//
//            ex: console.log('>> word <<');          
//               ex: console.log('WORD');
//         ex: console.log('BOT WAS ONLINE');
//---------------------------------------------------//

client.once(Events.ClientReady, c => {
    client.user.setStatus('dnd');
    client.user.setActivity('月神', { type: ActivityType.Streaming });
    console.log(' ');
    console.log(' ');
    console.log('>> DiscordBot online <<')
    console.log(' ');
    console.log(' ');

});
//---------------------------------------------------//
//                    || Rules ||                    //
//---------------------------------------------------//

client.on(Events.MessageCreate, (message) => {
  if (message.content === '!rules') {
 message.channel.send('');
}
});

//---------------------------------------------------//
//                     || 公告 ||                     //
//---------------------------------------------------//

client.on(Events.MessageCreate, (message) => {
  if (message.content === '!公告') {
 message.channel.send
 ('');
}
});

//---------------------------------------------------//
//                 || 機器人自動回復 ||                //
//---------------------------------------------------//
//ex:
//    client.on('message, (message) => {
//       if (message.content === '!word') {
//     message.channel.send('word-2');
//    }
//   });
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

    client.on(Events.MessageCreate, (message) => {
      if (message.content === '!help') {
        message.channel.send('? what ?');
      }
    });

    client.on(Events.MessageCreate, (message) => {
      if (message.content === '$ip') {
        message.channel.send('IP: mcofc.minecraft.best');
      }
    });


//----------------------------------------------------//
//              Member join and leave                 //
//----------------------------------------------------//

client.on('guildMemberAdd', member => {
  const welcomeEmbed = new EmbedBuilder()
    .setColor('#00FF00')
    .setTitle('有人加入了')
    .setDescription(`歡迎🙌 ${member.user} \n**加入 石器起源
      記得去 ⁠https://discord.com/channels/1302432939241504821/1302601550434406410 拿基本身份,看規則和申請表單\nenjoy！！！**`)
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp();

  // 使用頻道ID發送訊息
  const channel = member.guild.channels.cache.get('1307247950136610826'); // 加入通知頻道ID
  if (channel) {
    channel.send({ embeds: [welcomeEmbed] });
  }
});

// 成員退出伺服器時
client.on('guildMemberRemove', member => {
  const goodbyeEmbed = new EmbedBuilder()
    .setColor('#FF0000')
    .setTitle('有人退出了！！！')
    .setDescription(`${member.user} \n**離開了 石器起源(┬┬﹏┬┬)**`)
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp();

  // 使用頻道ID發送訊息
  const channel = member.guild.channels.cache.get('1302907689839362058'); // 退出通知頻道ID
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