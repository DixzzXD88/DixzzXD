const axios = require("axios");

module.exports = async function (sock, msg, args) {
  try {
    if (!args[0]) {
      return sock.sendMessage(msg.from, {
        text: "❗ Contoh:\n.hokiweton 12/07/2010"
      }, { quoted: msg });
    }

    // parsing tanggal
    const [tgl, bln, thn] = args[0].split("/");
    if (!tgl || !bln || !thn) {
      return sock.sendMessage(msg.from, {
        text: "⚠️ Format salah!\nGunakan format: 12/07/2010"
      }, { quoted: msg });
    }

    const url = `https://api.siputzx.my.id/api/primbon/rejeki_hoki_weton?tgl=${tgl}&bln=${bln}&thn=${thn}`;
    const { data } = await axios.get(url);

    if (!data.status) {
      return sock.sendMessage(msg.from, {
        text: "⚠️ Gagal mengambil data rejeki/hoki weton."
      }, { quoted: msg });
    }

    const weton = data.data;

    const teks = `🍀 *Rejeki & Hoki Weton*\n\n📅 *Hari Lahir:* ${weton.hari_lahir}\n\n💰 *Rejeki/Hoki:*\n${weton.rejeki}\n\n📝 *Catatan:*\n${weton.catatan}`;

    await sock.sendMessage(msg.from, { text: teks }, { quoted: msg });

  } catch (err) {
    console.error("❌ Error di plugin hokiweton:", err.message);
    await sock.sendMessage(msg.from, {
      text: "⚠️ Terjadi error, coba lagi nanti."
    }, { quoted: msg });
  }
};