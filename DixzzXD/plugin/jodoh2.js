const axios = require("axios");

module.exports = async function (sock, msg, args) {
  try {
    if (args.length < 2) {
      return sock.sendMessage(msg.from, {
        text: "❗ Contoh:\n.jodoh2 Adit/12/07/2010 Laura/15/12/2012"
      }, { quoted: msg });
    }

    // parsing pasangan 1
    const p1 = args[0].split("/");
    const nama1 = p1[0];
    const tgl1 = p1[1];
    const bln1 = p1[2];
    const thn1 = p1[3];

    // parsing pasangan 2
    const p2 = args[1].split("/");
    const nama2 = p2[0];
    const tgl2 = p2[1];
    const bln2 = p2[2];
    const thn2 = p2[3];

    const url = `https://api.siputzx.my.id/api/primbon/ramalanjodoh?nama1=${encodeURIComponent(nama1)}&tgl1=${tgl1}&bln1=${bln1}&thn1=${thn1}&nama2=${encodeURIComponent(nama2)}&tgl2=${tgl2}&bln2=${bln2}&thn2=${thn2}`;
    const { data } = await axios.get(url);

    if (!data.status) {
      return sock.sendMessage(msg.from, {
        text: "⚠️ Gagal menghitung ramalan jodoh."
      }, { quoted: msg });
    }

    const hasil = data.data.result;
    const ramalanList = hasil.hasil_ramalan.map((r, i) => `${i + 1}. ${r}`).join("\n");

    const teks = `💞 *Ramalan Jodoh*\n\n👤 *${hasil.orang_pertama.nama}* (${hasil.orang_pertama.tanggal_lahir})\n❤️ *${hasil.orang_kedua.nama}* (${hasil.orang_kedua.tanggal_lahir})\n\n📖 *Deskripsi:*\n${hasil.deskripsi}\n\n🔮 *Hasil Ramalan:*\n${ramalanList}\n\n⚠️ ${data.data.peringatan}`;

    await sock.sendMessage(msg.from, { text: teks }, { quoted: msg });

  } catch (err) {
    console.error("❌ Error di plugin jodoh2:", err.message);
    await sock.sendMessage(msg.from, {
      text: "⚠️ Terjadi error, coba lagi nanti."
    }, { quoted: msg });
  }
};