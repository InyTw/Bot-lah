const fs = require('fs');
const path = require('path');
const {
    Client,
    GatewayIntentBits,
    Collection,
    EmbedBuilder,
    ButtonBuilder,
    ActionRowBuilder,
    ButtonStyle,
    ChannelType,
    PermissionsBitField
} = require('discord.js');
const { token } = require('./config.json');
const { readTickets, writeTickets } = require('./storage');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', async () => {
    console.log('>> BOT IS ONLINE <<');

    const savedTickets = readTickets();
    let dataUpdated = false;

    for (const [interactionId, ticketData] of Object.entries(savedTickets)) {
        const {
            channelId,
            messageId,
            title,
            description,
            buttonText,
            categoryName,
            supportRoleId,
            colorChoice,
            buttonColorChoice,
            buttonEmoji
        } = ticketData;

        const channel = client.channels.cache.get(channelId);

        if (!channel) {
            console.warn(`頻道 ID ${channelId} 找不到，跳過這個客服單。`);
            continue;
        }

        let message;
        try {
            message = await channel.messages.fetch(messageId);
            console.log(`成功取得訊息 ID ${messageId} 於頻道 ${channelId}`);
        } catch (error) {
            if (error.code === 10008) {
                console.warn(`訊息 ID ${messageId} 不存在於頻道 ${channelId}，將重新發送訊息。`);
            } else {
                console.error(`無法取得訊息 ID ${messageId} 於頻道 ${channelId}：`, error);
                continue;
            }
        }

        if (!message) {
            const embedColor = {
                Red: '#FF0000',
                Orange: '#FFA500',
                Yellow: '#FFFF00',
                'Light Yellow': '#FFFFE0',
                'Dark Green': '#006400',
                Green: '#008000',
                'Light Green': '#90EE90',
                Aqua: '#00FFFF',
                'Light Blue': '#ADD8E6',
                Blue: '#0000FF',
                'Dark Blue': '#00008B',
                Magenta: '#FF00FF',
                Purple: '#800080',
            }[colorChoice] || '#00FFFF';

            const buttonStyle = {
                Red: ButtonStyle.Danger,
                Yellow: ButtonStyle.Secondary,
                Green: ButtonStyle.Success,
                Blue: ButtonStyle.Primary,
                Gray: ButtonStyle.Secondary,
            }[buttonColorChoice] || ButtonStyle.Primary;

            const ticketEmbed = new EmbedBuilder()
                .setTitle(title)
                .setDescription(description)
                .setColor(embedColor)
                .setFooter({ text: 'emmmm', iconURL: '' });

            const ticketButton = new ButtonBuilder()
                .setCustomId(`create_ticket_${interactionId}`)
                .setLabel(buttonText)
                .setStyle(buttonStyle);

            if (buttonEmoji) {
                ticketButton.setEmoji(buttonEmoji);
            }

            const row = new ActionRowBuilder().addComponents(ticketButton);

            message = await channel.send({ embeds: [ticketEmbed], components: [row] });
            console.log(`新訊息已發送於頻道 ${channelId}，訊息 ID ${message.id}`);

            savedTickets[interactionId].messageId = message.id;
            dataUpdated = true;
        }

        const filter = i => i.customId === `create_ticket_${interactionId}`;
        const collector = message.createMessageComponentCollector({ filter, time: 86400000 });

        collector.on('collect', async i => {
            const guild = i.guild;
            const existingChannel = guild.channels.cache.find(channel => channel.name === `客服單-${i.user.id}`);
            if (existingChannel) {
                return i.reply({ content: '您已經有一個開啟的客服單', ephemeral: true });
            }

            const category = guild.channels.cache.find(c => c.name === categoryName && c.type === ChannelType.GuildCategory);

            if (!category) {
                return i.reply({ content: `找不到類別: ${categoryName}`, ephemeral: true });
            }

            const newChannel = await guild.channels.create({
                name: `客服單-${i.user.username}`,
                type: ChannelType.GuildText,
                parent: category.id,
                permissionOverwrites: [
                    {
                        id: guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: i.user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory],
                    },
                    {
                        id: supportRoleId,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory],
                    },
                ],
            });

            await newChannel.send(`<@&${supportRoleId}> ${i.user} 已建立客服單`);

            const originalMessage = await i.message.fetch();
            const updatedEmbed = EmbedBuilder.from(originalMessage.embeds[0])
                .setTitle(`主題 ${title}`)
                .setDescription(`客服單開啟者: ${i.user.username}`);

            await originalMessage.edit({ embeds: [updatedEmbed] });

            i.reply({ content: `已建立客服單: ${newChannel}`, ephemeral: true });
        });

        collector.on('end', collected => {
            console.log(`收集器結束，共收集了 ${collected.size} 個互動。`);
        });
    }

    if (dataUpdated) {
        console.log('更新 data.json 中的訊息 ID...');
        writeTickets(savedTickets);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: '執行指令時出現錯誤', ephemeral: true });
    }
});

// 成員加入伺服器時
client.on('guildMemberAdd', member => {
  const welcomeEmbed = new EmbedBuilder()
    .setColor('#00FF00')
    .setTitle('有人加入了')
    .setDescription(`${member.user.tag} \n**加入了伺服器╰(*°▽°*)╯**`)
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp();

  // 使用頻道ID發送訊息
  const channel = member.guild.channels.cache.get('1256807394701217855'); // 加入通知頻道ID
  if (channel) {
    channel.send({ embeds: [welcomeEmbed] });
  }
});

// 成員退出伺服器時
client.on('guildMemberRemove', member => {
  const goodbyeEmbed = new EmbedBuilder()
    .setColor('#FF0000')
    .setTitle('有人退出了！！！')
    .setDescription(`${member.user.tag} \n**離開了我們(┬┬﹏┬┬)**`)
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp();

  // 使用頻道ID發送訊息
  const channel = member.guild.channels.cache.get('1256807394701217855'); // 退出通知頻道ID
  if (channel) {
    channel.send({ embeds: [goodbyeEmbed] });
  }
});

client.on(Events.MessageCreate, (message) => {
    if (message.contest === 'w')
        message.channel.send('ww')
}
});
          
client.login(token);
