const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('playeronline')
        .setDescription('伺服器上的在線人數'),
    async execute(interaction) {
        const serverIp = 'cloudmoon.owo.bar';
        const apiUrl = `https://api.mcstatus.io/v2/status/java/cloudmoon.owo.bar`;

        try {
            const response = await axios.get(apiUrl);
            const data = response.data;

            if (!data.online) {
                await interaction.reply({ content: '伺服器目前不在線上', ephemeral: true });
                return;
            }

            const onlinePlayers = data.players.online;
            const maxPlayers = data.players.max;
            const playerList = data.players.list.map(player => player.name).join(', ') || '沒有玩家在線上';

            const onlinePlayersEmbed = new EmbedBuilder()
                .setTitle('伺服器在線玩家')
                .setDescription(`在線玩家數: ${onlinePlayers}/${maxPlayers}\n線上的玩家: ${playerList}`)

            await interaction.reply({ embeds: [onlinePlayersEmbed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '沒辦法獲取伺服器資訊, 等下在試一次吧 :P', ephemeral: true });
        }
    },
};