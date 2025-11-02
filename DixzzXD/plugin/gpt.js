const axios = require("axios")

module.exports = async function (sock, msg, args) {
  try {
    if (!args || !args.length) {
      return sock.sendMessage(
        msg.key.remoteJid,
        { text: "❌ Contoh: .gpt siapa penemu bitcoin" },
        { quoted: msg }
      )
    }


    await sock.sendMessage(msg.key.remoteJid, {
      react: {
        text: "🔍",
        key: msg.key
      }
    })

    const query = encodeURIComponent(args.join(" "))
    const url = `https://api.sxtream.xyz/ai/ai-gpt4?query=${query}`

    const response = await axios.get(url)
    const result = response.data


    const reply = result.result || "❌ Tidak ada jawaban dari API"

    await sock.sendMessage(
      msg.key.remoteJid,
      { text: reply },
      { quoted: msg }
    )


    await sock.sendMessage(msg.key.remoteJid, {
      react: {
        text: "✅",
        key: msg.key
      }
    })
  } catch (err) {
    console.error("GPT Plugin Error:", err.response?.data || err.message)
    await sock.sendMessage(
      msg.key.remoteJid,
      { text: "❌ Terjadi kesalahan saat menghubungi GPT API" },
      { quoted: msg }
    )
  }
}