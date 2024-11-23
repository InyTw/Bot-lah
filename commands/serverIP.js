const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server_ip')
        .setDescription('伺服器IP'),
    async execute(interaction) {
        const ipEmbed = new EmbedBuilder()
            .setTitle('SERVER_IP\n\n**```cloudmoon.ttfmc.net```**/nVersion:1.21')
            .setDescription('版本: 1.21')
            .setThumbnail()
            .setColor('00FFFF');

        await interaction.reply({ embeds: [ipEmbed] });
    },
};