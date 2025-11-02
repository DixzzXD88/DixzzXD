const axios = require("axios")

module.exports = async (sock, msg, args) => {
  const text = args.join(" ")
  if (!text) {
    await sock.sendMessage(msg.from, {
      text: "Contoh penggunaan:\n.deepai siapa penemu bitcoin"
    }, { quoted: msg })
    return
  }

  try {
    await sock.sendMessage(msg.from, {
      react: { text: "⏳", key: msg.key }
    })

    const url = `https://api.sxtream.xyz/ai/deepai?prompt=${encodeURIComponent(text)}`
    const response = await axios.get(url)

    let result = response.data?.data || "Tidak ada hasil dari API."
    result = result.replace(/\n/g, " ").replace(/\s+/g, " ").trim()

    if (result.includes("*")) {
      result = result
        .split("*")
        .map(p => p.trim())
        .filter(p => p)
        .join("\n\n")
    }

    await sock.sendMessage(msg.from, {
      text: `🤖 Jawaban:\n\n${result}`
    }, { quoted: msg })

    await sock.sendMessage(msg.from, {
      react: { text: "✅", key: msg.key }
    })
  } catch (err) {
    console.error("❌ Error di plugin deepai:", err)
    await sock.sendMessage(msg.from, {
      text: "Terjadi kesalahan saat memproses permintaan."
    }, { quoted: msg })
  }
}