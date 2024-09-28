const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testbutton')
        .setDescription('顯示測試按鈕的訊息'),
    async execute(interaction) {
        // 建立按鈕
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('primary')
                    .setLabel('點我!')
                    .setStyle(ButtonStyle.Primary)
// Primary只是其中一種按鈕樣式, 其實還有很多種顏色

            );

        await interaction.reply({ content: '這是一個按鈕範例!', components: [row] });

        // 按鈕交互處理
        const filter = i => i.customId === 'primary' && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async i => {
            if (i.customId === 'primary') {
                await i.update({ content: '你按下了按鈕', components: [] });
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                interaction.editReply({ content: '按鈕失效', components: [] });
            }
        });
    },
};