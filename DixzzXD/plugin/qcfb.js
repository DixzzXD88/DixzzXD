const axios = require("axios");

module.exports = async (sock, msg, args) => {
  if (args.length < 2) {
    return sock.sendMessage(msg.from, { 
      text: `⚠️ Format salah!\nContoh: *.qcfb Ditzz Semua akan pret pada waktunya*`
    });
  }

  try {
    // ambil kata pertama sebagai nama, sisanya komentar
    const name = args[0];
    const comment = args.slice(1).join(" ");

    // default profile picture dari API terbaru
    const defaultProfile = "https://files.catbox.moe/f7g0nx.jpg";

    // kasih reaction ⏳
    await sock.sendMessage(msg.from, { react: { text: "⏳", key: msg.key } });

    // request ke API (langsung ambil gambar)
    const response = await axios.get(
      `https://api.sxtream.xyz/maker/fake-chat-fb?name=${encodeURIComponent(name)}&comment=${encodeURIComponent(comment)}&profileUrl=${encodeURIComponent(defaultProfile)}`,
      { responseType: "arraybuffer" }
    );

    // kirim foto langsung
    await sock.sendMessage(msg.from, { 
      image: Buffer.from(response.data),
      caption: `💬 Fake chat Facebook\n👤 ${name}\n💭 ${comment}`
    });

    // kasih reaction ✅
    await sock.sendMessage(msg.from, { react: { text: "✅", key: msg.key } });

  } catch (err) {
    console.error("❌ Error di plugin qcfb:", err);
    await sock.sendMessage(msg.from, { 
      text: "⚠️ Terjadi kesalahan saat membuat fake chat FB."
    });
  }
};