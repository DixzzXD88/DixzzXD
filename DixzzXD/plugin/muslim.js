const axios = require("axios");

module.exports = async (sock, msg, args, { isOwner }) => {
  const text = args.join(" "); // gabungkan args jadi string

  if (!text) {
    return sock.sendMessage(msg.from, { text: `Format salah!\nContoh: *.muslim Hukum pacaran dalam Islam*` });
  }

  try {
    // kasih reaction 🔍
    await sock.sendMessage(msg.from, { react: { text: "🔍", key: msg.key } });

    const response = await axios.get(
      `https://api.siputzx.my.id/api/ai/muslimai?query=${encodeURIComponent(text)}`
    );
    
    if (response.data && response.data.status) {
      await sock.sendMessage(msg.from, { text: response.data.data });

      // kasih reaction ✅ setelah selesai
      await sock.sendMessage(msg.from, { react: { text: "✅", key: msg.key } });
    } else {
      await sock.sendMessage(msg.from, { text: "Maaf, saya tidak dapat menemukan jawaban untuk pertanyaan Anda." });
    }

  } catch (err) {
    console.error("❌ Error di plugin muslim:", err);
    await sock.sendMessage(msg.from, { text: "⚠️ Terjadi kesalahan saat memproses permintaan." });
  }
};