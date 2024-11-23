const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('Bot-info')
        .setDescription('Bot-info'),
    async execute(interaction) {
        const ipEmbed = new EmbedBuilder()
            .setTitle(`Bot's Name: ${client.user.username}\n`+
            `Bot's ID: ${client.user.id}\n`+
            `Bot's Creator: InyTww_qt\n`+
            `Bot's birthday: <t:${~~(client.user.createdTimestamp/1000)}:R>\n`+
            `Bot's Online time: ${msToHMS(client.uptime)}`)
            .setDescription('DiscordMcBot')
            .setThumbnail()
            .setColor('00FFFF');

        await interaction.reply({ embeds: [bot_infoEmbed] });
    },
};