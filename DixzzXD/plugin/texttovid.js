module.exports = async (sock, msg, args, { isOwner }) => {
  const prompt = args.join(" ");
  if (!prompt) {
    return sock.sendMessage(msg.from, {
      text: "⚠️ Format salah!\nContoh: *.texttovid Mobil Lamborghini terbang*"
    });
  }

  try {
    // kasih reaction loading
    await sock.sendMessage(msg.from, { react: { text: "⏳", key: msg.key } });

    // buat link API dengan prompt user
    const url = `https://api.sxtream.xyz/ai/texttovideo?prompt=${encodeURIComponent(prompt)}`;

    // kirim link ke user
    await sock.sendMessage(msg.from, {
      text: `🎬 Video untuk prompt: *${prompt}*\n\nKlik link ini untuk melihat videonya:\n${url}`
    });

    // reaction selesai
    await sock.sendMessage(msg.from, { react: { text: "✅", key: msg.key } });
    
  } catch (err) {
    console.error("❌ Error di plugin texttovid:", err);
    await sock.sendMessage(msg.from, {
      text: "⚠️ Terjadi kesalahan saat membuat video."
    });
  }
};