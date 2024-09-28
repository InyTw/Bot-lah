const { REST, Routes } = require('discord.js');
const { clientId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

// 取得 commands 資料夾中的所有指令
const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}

// 建立 REST 物件用於載入指令
const rest = new REST({ version: '10' }).setToken(token);

// 將斜線 [/] 指令載入至Discord Bot上
(async () => {
    try {
        console.log('開始重新加載所有指令');

        await rest.put(Routes.applicationCommands(clientId), {
            body: commands,
        });

        console.log('加載完成');
    } catch (error) {
        console.error(error);
    }
})();