const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-ip')
        .setDescription('伺服器 IP'),

    async execute(interaction) {
          const ipEmbed = new EmbedBuilder()
        .setTitle('#SRV-info\nIP: xaiomi.minecraft.best')
        .setDescription('version: 1.21')
        .setColor('#00FFFF');

        await interaction.reply({ embeds: [ipEmbed] });
    },
};