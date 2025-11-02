const axios = require("axios");

module.exports = async (sock, msg, args, { isOwner }) => {
  if (!args.length) {
    return await sock.sendMessage(msg.from, {
      text: "⚠️ Harap berikan teks setelah perintah.",
    });
  }

  const text = args.join(" ");

  try {
    // ⏳ reaction saat proses
    await sock.sendMessage(msg.from, {
      react: {
        text: "⏳",
        key: msg.key
      }
    });

    // API Brat
    const url = `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(
      text
    )}&isAnimated=false&delay=500`;

    const response = await axios.get(url, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data, "binary");

    // Kirim sebagai stiker
    await sock.sendMessage(msg.from, {
      sticker: imageBuffer
    });

    // ✅ reaction selesai
    await sock.sendMessage(msg.from, {
      react: {
        text: "✅",
        key: msg.key
      }
    });

  } catch (error) {
    console.error("Gagal membuat stiker Brat:", error);
    await sock.sendMessage(msg.from, {
      text: "❌ Terjadi kesalahan saat membuat stiker.",
    });
  }
};