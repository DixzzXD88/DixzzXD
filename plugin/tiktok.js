const axios = require("axios");

module.exports = async function (sock, msg, args) {
  try {
    if (!args || !args.length) {
      return sock.sendMessage(
        msg.key.remoteJid,
        { text: "❌ Contoh: .tiktok https://vt.tiktok.com/ZSyamXD1r/" },
        { quoted: msg }
      );
    }

    const tiktokUrl = args[0];
    const jid = msg.key.remoteJid;

    await sock.sendMessage(jid, {
      react: { text: "🔍", key: msg.key },
    });

    // API tikwm.com
    const api = `https://tikwm.com/api/?url=${encodeURIComponent(tiktokUrl)}`;

    const { data } = await axios.get(api);

    if (data.code !== 0) {
      return sock.sendMessage(
        jid,
        { text: "❌ Gagal mengambil data dari API TikTok." },
        { quoted: msg }
      );
    }

    const { data: videoData } = data;
    const { title, music_info } = videoData;
    
    // Kirim video tanpa watermark
    if (videoData.play) {
      await sock.sendMessage(
        jid,
        {
          video: { url: videoData.play },
          caption: `🎥 ${title || "Video TikTok"}\n✅ Tanpa watermark\n\n🎵 Musik: ${music_info?.title || "Unknown"}`
        },
        { quoted: msg }
      );
    }

    // Kirim video dengan watermark (jika ada)
    if (videoData.wmplay) {
      await sock.sendMessage(
        jid,
        {
          video: { url: videoData.wmplay },
          caption: `🎥 ${title || "Video TikTok"}\n🏷️ Dengan watermark\n\n🎵 Musik: ${music_info?.title || "Unknown"}`
        },
        { quoted: msg }
      );
    }

    // Kirim audio (jika ada)
    if (videoData.music) {
      await sock.sendMessage(
        jid,
        {
          audio: { url: videoData.music },
          mimetype: "audio/mpeg",
          ptt: false,
        },
        { quoted: msg }
      );
    }

    await sock.sendMessage(jid, {
      react: { text: "✅", key: msg.key },
    });

  } catch (err) {
    console.error("TikTok Plugin Error:", err.response?.data || err.message);
    await sock.sendMessage(
      msg.key.remoteJid,
      { text: "❌ Terjadi kesalahan saat mengunduh video TikTok." },
      { quoted: msg }
    );
  }
};