const axios = require("axios");

module.exports = async function (sock, msg, args) {
    try {
        if (!args.length) {
            return sock.sendMessage(msg.from, { 
                text: "❗ Contoh:\n.artimimpi bertemu tuan putri" 
            }, { quoted: msg });
        }

        const query = args.join(" ");
        const url = `https://api.siputzx.my.id/api/primbon/tafsirmimpi?mimpi=${encodeURIComponent(query)}`;

        const { data } = await axios.get(url);

        if (!data.status) {
            return sock.sendMessage(msg.from, { 
                text: "⚠️ Tafsir mimpi tidak ditemukan." 
            }, { quoted: msg });
        }

        const hasil = data.data.hasil?.length 
            ? data.data.hasil.join("\n")
            : "Tidak ada detail hasil.";

        const teks = `📌 *Arti Mimpi*\n\n` +
                     `🔑 Keyword: ${data.data.keyword}\n` +
                     `📖 Hasil: ${hasil}\n\n` +
                     `💡 Solusi:\n${data.data.solusi}`;

        await sock.sendMessage(msg.from, { text: teks }, { quoted: msg });

    } catch (err) {
        console.error("❌ Error di plugin artimimpi:", err);
        await sock.sendMessage(msg.from, { 
            text: "⚠️ Terjadi kesalahan saat mengambil data arti mimpi." 
        }, { quoted: msg });
    }
};