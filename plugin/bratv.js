require('../settings/config');
const axios = require('axios');

let handler = async (m, { client, text, reply, reaction, pushname, prefix, command }) => {
    if (!text) return reply(`\n*ex:* ${prefix + command} Hello world!\n`);

    await reaction(m.chat, '⚡');

    try {
        // API brat
        const bratUrl = `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(text)}&isAnimated=true&delay=500`;

        const res = await axios.get(bratUrl, {
            responseType: 'arraybuffer'
        });

        let encmedia = await client.sendImageAsSticker(m.chat, res.data, m, {
            packname: "BRATGENERATOR",
            author: "DixzzXD-NEW ERA"
        });

    } catch (err) {
        console.error(err);
        reply('Failed');
    }
}

handler.help = ['brat']
handler.tags = ['sticker']
handler.command = ['bratv']
handler.isGb = true

module.exports = handler;