const axios = require("axios");

module.exports = async function (sock, msg, args) {
  try {
    if (!args.length || !args.join(" ").includes("|")) {
      return sock.sendMessage(msg.from, {
        text: "❗ Contoh:\n.jodoh Adit|Laura"
      }, { quoted: msg });
    }

    // ambil nama1 dan nama2 dipisah dengan tanda "|"
    const [nama1, nama2] = args.join(" ").split("|").map(s => s.trim());
    if (!nama1 || !nama2) {
      return sock.sendMessage(msg.from, {
        text: "⚠️ Format salah! Gunakan: .jodoh Nama1|Nama2"
      }, { quoted: msg });
    }

    const url = `https://api.siputzx.my.id/api/primbon/kecocokan_nama_pasangan?nama1=${encodeURIComponent(nama1)}&nama2=${encodeURIComponent(nama2)}`;
    const { data } = await axios.get(url);

    if (!data.status) {
      return sock.sendMessage(msg.from, {
        text: `⚠️ Gagal mengecek kecocokan ${nama1} ❤️ ${nama2}`
      }, { quoted: msg });
    }

    const hasil = data.data;
    const teks = `💞 *Kecocokan Nama*\n\n👤 Anda : *${hasil.nama_anda}*\n👤 Pasangan : *${hasil.nama_pasangan}*\n\n✨ *Hasil* :\n${hasil.sisi_negatif}\n\n📝 *Catatan* :\n${hasil.catatan}`;

    await sock.sendMessage(msg.from, { text: teks }, { quoted: msg });

  } catch (err) {
    console.error("❌ Error di plugin jodoh:", err.message);
    await sock.sendMessage(msg.from, {
      text: "⚠️ Terjadi error, coba lagi nanti."
    }, { quoted: msg });
  }
};