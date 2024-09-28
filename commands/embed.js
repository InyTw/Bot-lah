const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testembed')
        .setDescription('顯示Embed訊息'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#00FFFF')
// 目前#00FFFF 是青色, 為十六進位色碼
            .setTitle('這是一個Embed訊息 標題 範例')
            .setDescription('這是Embed訊息的 說明 部分')
            .setImage('你的小圖片URL')
            .setThumbnail('你的大圖片URL')
// 可以用 imgurl 網站作為很好的圖片連結生成器
            .setFooter({ text: '底部文字', iconURL: '底部圖片URL' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
// 以上的 [embed] 都可替換為[你想要的Embed名稱]

    },
};