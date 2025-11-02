const axios = require("axios");

module.exports = async function (sock, msg, args) {
  try {
    if (!args[0]) {
      return sock.sendMessage(msg.from, {
        text: "❗ Contoh:\n.sifatbisnis 12/07/2010"
      }, { quoted: msg });
    }

    // parsing tanggal
    const [tgl, bln, thn] = args[0].split("/");
    if (!tgl || !bln || !thn) {
      return sock.sendMessage(msg.from, {
        text: "⚠️ Format salah!\nGunakan format: 12/07/2010"
      }, { quoted: msg });
    }

    const url = `https://api.siputzx.my.id/api/primbon/sifat_usaha_bisnis?tgl=${tgl}&bln=${bln}&thn=${thn}`;
    const { data } = await axios.get(url);

    if (!data.status) {
      return sock.sendMessage(msg.from, {
        text: "⚠️ Gagal mengambil data sifat bisnis."
      }, { quoted: msg });
    }

    const hasil = data.data;

    const teks = `🏢 *Sifat Usaha & Bisnis*\n\n📅 *Hari Lahir:* ${hasil.hari_lahir}\n\n💼 *Sifat Usaha:*\n${hasil.usaha}\n\n📝 *Catatan:*\n${hasil.catatan}`;

    await sock.sendMessage(msg.from, { text: teks }, { quoted: msg });

  } catch (err) {
    console.error("❌ Error di plugin sifatbisnis:", err.message);
    await sock.sendMessage(msg.from, {
      text: "⚠️ Terjadi error, coba lagi nanti."
    }, { quoted: msg });
  }
};