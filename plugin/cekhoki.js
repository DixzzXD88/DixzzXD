const axios = require("axios");

module.exports = async function (sock, msg, args) {
  try {
    if (!args.length) {
      return sock.sendMessage(msg.from, {
        text: "❗ Contoh:\n.cekhoki 6285777489193"
      }, { quoted: msg });
    }

    const nomor = args[0].trim();
    const url = `https://api.siputzx.my.id/api/primbon/nomorhoki?phoneNumber=${encodeURIComponent(nomor)}`;
    const { data } = await axios.get(url);

    if (!data.status) {
      return sock.sendMessage(msg.from, {
        text: `⚠️ Gagal mengecek hoki nomor *${nomor}*`
      }, { quoted: msg });
    }

    const hasil = data.data;
    const teks = `📱 *Nomor Hoki*\n\nNomor: *${hasil.nomor}*\n\n✨ Hasil :\n${hasil.analisis.description}`;

    await sock.sendMessage(msg.from, { text: teks }, { quoted: msg });

  } catch (err) {
    console.error("❌ Error di plugin cekhoki:", err.message);
    await sock.sendMessage(msg.from, {
      text: "⚠️ Terjadi error, coba lagi nanti."
    }, { quoted: msg });
  }
};