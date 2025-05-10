const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('music')
    .setDescription('播放 (僅模擬功能)')
    .addStringOption(option =>
        option.setName('musicname').setDescription('音樂名稱').setRequired(true)),
    async execute(interaction) {
        const musicName = interaction.option.getString('music_name');
        await interaction.reply(`▶️ 播放: **${musicName}**`);
    }
}