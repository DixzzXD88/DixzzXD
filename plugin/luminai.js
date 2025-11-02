const axios = require("axios");

module.exports = async (sock, msg, args, { isOwner }) => {
  const query = args.join(" ");
  
  if (!query) {
    return sock.sendMessage(msg.from, { 
      text: `⚠️ Format salah!\nContoh: *.luminai siapa pencipta komputer quantum*` 
    });
  }

  try {
    await sock.sendMessage(msg.from, { react: { text: "⏳", key: msg.key } });

    const response = await axios.get(
      `https://api.sxtream.xyz/ai/luminai?query=${encodeURIComponent(query)}`
    );

    console.log("🔍 Hasil JSON LuminAI:", response.data);

    // ambil bagian data
    if (response.data && response.data.status && response.data.data) {
      await sock.sendMessage(msg.from, { 
        text: `✨ *Jawaban LuminAI:*\n\n${response.data.data.trim()}` 
      });

      await sock.sendMessage(msg.from, { react: { text: "✅", key: msg.key } });
    } else {
      await sock.sendMessage(msg.from, { 
        text: "❌ Gagal mendapatkan jawaban dari LuminAI." 
      });
    }

  } catch (err) {
    console.error("❌ Error di plugin luminai:", err);
    await sock.sendMessage(msg.from, { 
      text: "⚠️ Terjadi kesalahan saat memproses permintaan." 
    });
  }
};