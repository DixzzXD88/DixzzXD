const axios = require("axios");

module.exports = async (sock, msg, args, { isOwner }) => {
  const text = args.join(" ");
  
  if (!text) {
    return sock.sendMessage(msg.from, { 
      text: "⚠️ Contoh: .nulis aku ganteng" 
    }, { quoted: msg });
  }

  try {
    // kasih reaction ⏳
    await sock.sendMessage(msg.from, { react: { text: "⏳", key: msg.key } });

    const apiUrl = `https://brat.siputzx.my.id/nulis?text=${encodeURIComponent(text)}`;
    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

    await sock.sendMessage(
      msg.from,
      {
        image: Buffer.from(response.data, "binary"),
        caption: `📝 Hasil nulis: ${text}`
      },
      { quoted: msg }
    );

    // kasih reaction ✅ kalo sukses
    await sock.sendMessage(msg.from, { react: { text: "✅", key: msg.key } });

  } catch (err) {
    console.error("❌ Error di plugin nulis:", err.message);

    // kasih reaction ❌ kalo error
    await sock.sendMessage(msg.from, { react: { text: "❌", key: msg.key } });

    await sock.sendMessage(msg.from, { 
      text: "⚠️ Gagal generate nulis, coba lagi!" 
    }, { quoted: msg });
  }
};