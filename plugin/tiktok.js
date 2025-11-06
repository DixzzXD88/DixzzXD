const axios = require("axios");

module.exports = async function (sock, msg, args) {
  try {
    if (!args || !args.length) {
      return sock.sendMessage(
        msg.key.remoteJid,
        { text: "❌ Contoh: .tiktok https://vt.tiktok.com/ZSyaGFR7J/" },
        { quoted: msg }
      );
    }

    const tiktokUrl = args[0];
    const jid = msg.key.remoteJid;

    await sock.sendMessage(jid, {
      react: { text: "🔍", key: msg.key },
    });

    // Coba multiple API fallback
    const apis = [
      `https://www.tikwm.com/api/?url=${encodeURIComponent(tiktokUrl)}`,
      `https://api.douyin.wtf/api?url=${encodeURIComponent(tiktokUrl)}`,
      `https://tikdown.org/get?url=${encodeURIComponent(tiktokUrl)}`
    ];

    let videoData = null;
    
    for (const api of apis) {
      try {
        console.log(`Trying API: ${api}`);
        const { data } = await axios.get(api, { timeout: 10000 });
        
        if (data.code === 0 || data.data) {
          videoData = data.data || data;
          console.log("Success with API:", api);
          break;
        }
      } catch (err) {
        console.log(`API failed: ${api}`, err.message);
        continue;
      }
    }

    if (!videoData) {
      return sock.sendMessage(
        jid,
        { text: "❌ Semua API sedang down. Coba lagi nanti." },
        { quoted: msg }
      );
    }

    // Kirim video
    if (videoData.play || videoData.noWatermark) {
      const videoUrl = videoData.play || videoData.noWatermark;
      await sock.sendMessage(
        jid,
        {
          video: { url: videoUrl },
          caption: `🎥 TikTok Downloader\n✅ Download berhasil!`
        },
        { quoted: msg }
      );
    }

    // Kirim audio
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
    console.error("TikTok Plugin Error:", err.message);
    await sock.sendMessage(
      msg.key.remoteJid,
      { text: "❌ Error: " + err.message },
      { quoted: msg }
    );
  }
};
