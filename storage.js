const fs = require('fs');
const path = require('path');

const ticketsFilePath = path.resolve(__dirname, 'tickets.json');
const dataFilePath = path.resolve(__dirname, 'data.json');

function readTickets() {
    try {
        const data = fs.readFileSync(ticketsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading tickets file:', err);
        return {};
    }
}

function writeTickets(data) {
    try {
        fs.writeFileSync(ticketsFilePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('Error writing tickets file:', err);
    }
}

function readData() {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading data file:', err);
        return {};
    }
}

function writeData(data) {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('Error writing data file:', err);
    }
}

module.exports = {
    readTickets,
    writeTickets,
    readData,
    writeData,
};