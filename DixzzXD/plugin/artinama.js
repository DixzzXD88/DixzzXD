const axios = require("axios");

module.exports = async function (sock, msg, args) {
  try {
    if (!args.length) {
      return sock.sendMessage(msg.from, { 
        text: "❗ Contoh:\n.artinama Adit" 
      }, { quoted: msg });
    }

    const nama = args.join(" ");
    const url = `https://api.siputzx.my.id/api/primbon/artinama?nama=${encodeURIComponent(nama)}`;

    const { data } = await axios.get(url);

    if (!data.status) {
      return sock.sendMessage(msg.from, { 
        text: `⚠️ Gagal menemukan arti nama *${nama}*.` 
      }, { quoted: msg });
    }

    const hasil = data.data;
    const teks = `✨ *Arti Nama ${hasil.nama}*\n\n${hasil.arti}\n\n📝 Catatan: ${hasil.catatan}`;

    await sock.sendMessage(msg.from, { text: teks }, { quoted: msg });
  } catch (err) {
    console.error("❌ Error di plugin artinama:", err.message);
    await sock.sendMessage(msg.from, { 
      text: "⚠️ Terjadi error, coba lagi nanti." 
    }, { quoted: msg });
  }
};