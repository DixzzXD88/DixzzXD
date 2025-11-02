const axios = require("axios");

module.exports = async (sock, msg, args, { isOwner }) => {
  const text = args.join(" ");
  
  if (!text) {
    return sock.sendMessage(msg.from, { 
      text: "⚠️ Contoh: .qc Halo bang"
    }, { quoted: msg });
  }

  try {
    await sock.sendMessage(msg.from, { react: { text: "⏳", key: msg.key } });

    const options = {
      method: "POST",
      url: "https://brat.siputzx.my.id/quoted",
      headers: { "Content-Type": "application/json" },
      responseType: "arraybuffer",
      data: {
        messages: [
          {
            from: {
              id: 1,
              first_name: msg.pushName || "user",
              last_name: "",
              name: msg.pushName || "user",
              photo: { url: "https://i.ibb.co/3N1rD4k/default-avatar.png" }
            },
            text,
            entities: [],
            avatar: true,
            media: { url: "" },
            mediaType: "",
            replyMessage: null
          }
        ],
        backgroundColor: "#292232",
        width: 512,
        height: 512,
        scale: 2,
        type: "quote",
        format: "png",
        emojiStyle: "apple"
      }
    };

    const response = await axios.request(options);

    await sock.sendMessage(
      msg.from,
      {
        image: Buffer.from(response.data, "binary"),
        caption: `💬 Fake chat dari: *${msg.pushName}*`
      },
      { quoted: msg }
    );

    await sock.sendMessage(msg.from, { react: { text: "✅", key: msg.key } });

  } catch (error) {
    console.error("❌ Error di plugin qc:", error.message);
    await sock.sendMessage(msg.from, { react: { text: "❌", key: msg.key } });
    await sock.sendMessage(msg.from, { 
      text: "⚠️ Gagal generate quoted chat, coba lagi!"
    }, { quoted: msg });
  }
};