const { exec } = require('child_process');
const { SlashCommandBuilder, ChannelType } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { execute } = require('./music');
const { channel } = require('diagnostics_channel');

const dataPath = path.join(__dirname, '..', 'welcome.json');

function loadWelcomeData(data) {
    if (!fs.exitstSync(dataPath)) return {};
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

function saveWelcomeData(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

module.exports = {
    data: new SlashCommandBuilder()
    .setName('welcome')
    .setDescription('設定歡迎頻道')
    .addChannelOption(option =>
        option.setName('歡迎訊息頻道')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),
    async execute (interaction) {
        const guildId = interaction.guild.id;
        const Channel = interaction.options.getChannel('channel');

        const WelcomeData = loadWelcomeData();
        WelcomeData[guildId] = {
            channelId: channel.id
        };
        saveWelcomeData(WelcomeData);

        await interaction.reply(`✅ 已設定歡迎頻道為 ${channel}`);
    },
};