const axios = require("axios");

module.exports = async function (sock, wrapper, args, { isOwner }) {
  try {
    const messageText = args.join(" ");
    if (!messageText) {
      return sock.sendMessage(
        wrapper.from,
        { text: "❗ Contoh:\n.iqc Halo, ini pesan quoted iPhone style" },
        { quoted: wrapper }
      );
    }

    await sock.sendMessage(wrapper.from, {
      react: { text: "⏳", key: wrapper.key }
    });

    const { data } = await axios.get("https://brat.siputzx.my.id/iphone-quoted", {
      params: { messageText },
      responseType: "arraybuffer"
    });

    await sock.sendMessage(
      wrapper.from,
      {
        image: Buffer.from(data),
        caption: `✅ *iPhone Quoted Style*\n\n💬 ${messageText}`
      },
      { quoted: wrapper }
    );

    await sock.sendMessage(wrapper.from, {
      react: { text: "✅", key: wrapper.key }
    });

  } catch (e) {
    console.error("Error IQC:", e.message);
    await sock.sendMessage(
      wrapper.from,
      { text: "❌ Terjadi kesalahan saat membuat iPhone quoted." },
      { quoted: wrapper }
    );
  }
};