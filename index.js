const TelegramBot = require('node-telegram-bot-api');
const request = require('request');

const token = '';

const bot = new TelegramBot(token, {polling: true});

function haeRuokalista(chatId, id) {

    var url = 'https://www.semma.fi/modules/json/json/Index?costNumber='+id+'&language=fi';
    var today = new Date().toJSON().toString().split('T');
    var viesti_tele = "";

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body)
            for (var i=0; i<info.MenusForDays.length; i++) {
                if (info.MenusForDays[i].Date.toString().split('T')[0] == today[0]) {
                    var paivan_ruokalista = info.MenusForDays[i].SetMenus
                    for (var j=0; j < paivan_ruokalista.length; j++) {
                        for (var u=0; u < paivan_ruokalista[j].Components.length; u++) {
                            viesti_tele += paivan_ruokalista[j].Components[u] + "\n";
                        }
                        viesti_tele += "\n";
                    }                
                }
            }
                
        }
        bot.sendMessage(chatId, viesti_tele);
    });
}

// Listen for any kind of message. There are different kinds of
// messages.
bot.onText(/\/piato/, (msg) => {
    const chatId = msg.chat.id;
    haeRuokalista(chatId ,1408);
});

bot.onText(/\/maija/, (msg) => {
    const chatId = msg.chat.id;
    haeRuokalista(chatId ,1402);
});