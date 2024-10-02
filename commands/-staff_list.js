const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('staff_list')
        .setDescription('工作人員名單'),
    async execute(interaction) {
        const ipEmbed = new EmbedBuilder()
            .setTitle('**【工作人員名單】**\n\n**『創始人』**\nXiaocker\n\n**『伺服主』**\n小監\n愛玩遊戲的小米\n\n**『管理員』**\nDarkShaDow_1027\n一隻很涼的貓\nKing of the legend\nLucas1000711\nᴡᴀꜱᴛᴇ˙u.\n\n**『建築師』**\nLucaspapa')
            .setDescription('staff_list')
            .setThumbnail()
            .setColor('ff0000');

        await interaction.reply({ embeds: [ipEmbed] });
    },
};