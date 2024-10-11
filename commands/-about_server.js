const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about_server')
        .setDescription('關於伺服器'),
    async execute(interaction) {
        const ipEmbed = new EmbedBuilder()
            .setTitle('**【☁雲月伺服器☁】**\n:servericon:如何加入伺服器?\nhttps://discord.com/channels/1256807394114273310/1256830345555345490\n\nDiscord永久連結:https://dsc.gg/cloudmoon')
            .setDescription('IP:cloudmoon.owo.bar')
            .setThumbnail()
            .setColor('00ff00');

        await interaction.reply({ embeds: [about_serverEmbed] });
    },
};