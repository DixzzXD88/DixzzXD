const axios = require("axios");

module.exports = async function (sock, msg, args) {
    try {
        if (!args.length) {
            return sock.sendMessage(msg.from, { 
                text: "❗ Contoh:\n.zodiak cancer" 
            }, { quoted: msg });
        }

        const query = args[0].toLowerCase();
        const url = `https://api.siputzx.my.id/api/primbon/zodiak?zodiak=${encodeURIComponent(query)}`;

        const { data } = await axios.get(url);

        if (!data.status) {
            return sock.sendMessage(msg.from, { 
                text: "⚠️ Zodiak tidak ditemukan." 
            }, { quoted: msg });
        }

        const z = data.data;
        const teks = `🔮 *Zodiak ${query.toUpperCase()}*\n\n` +
                     `♋ Zodiak: ${z.zodiak}\n` +
                     `🎲 Nomor Keberuntungan: ${z.nomor_keberuntungan}\n` +
                     `🌸 Aroma Keberuntungan: ${z.aroma_keberuntungan}\n` +
                     `🪐 Planet: ${z.planet_yang_mengitari}\n` +
                     `🌹 Bunga: ${z.bunga_keberuntungan}\n` +
                     `🎨 Warna: ${z.warna_keberuntungan}\n` +
                     `💎 Batu: ${z.batu_keberuntungan}\n` +
                     `💧 Elemen: ${z.elemen_keberuntungan}\n` +
                     `💞 Pasangan: ${z.pasangan_zodiak}`;

        await sock.sendMessage(msg.from, { text: teks }, { quoted: msg });

    } catch (err) {
        console.error("❌ Error di plugin zodiak:", err);
        await sock.sendMessage(msg.from, { 
            text: "⚠️ Terjadi kesalahan saat mengambil data zodiak." 
        }, { quoted: msg });
    }
};