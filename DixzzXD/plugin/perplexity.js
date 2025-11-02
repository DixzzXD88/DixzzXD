const axios = require("axios")

module.exports = async function (sock, msg, args, { isOwner }) {
  const text = args.join(" ")
  if (!text) {
    return sock.sendMessage(msg.from, {
      text: `Format salah!\n\nContoh penggunaan:\n.perplexity Siapa penemu Bitcoin?`
    })
  }

  try {

    await sock.sendMessage(msg.from, {
      react: { text: "🔍", key: msg.key }
    })

    const url = `https://api.siputzx.my.id/api/ai/perplexity?text=${encodeURIComponent(
      text
    )}&model=sonar-pro`
    const { data } = await axios.get(url)

    let jawaban = data?.data?.output || "❌ Tidak ada jawaban."


    jawaban = jawaban
      .replace(/[*_`#~>-]/g, "")
      .replace(/[\u200B-\u200D\uFEFF]/g, "")
      .replace(/\[\d+\]/g, "")
      .replace(/\s+/g, " ")
      .trim()


    let sentences = jawaban.split(/(?<=\.)\s+/)
    let paragraphs = []
    for (let i = 0; i < sentences.length; i += 2) {
      paragraphs.push(sentences.slice(i, i + 2).join(" "))
    }

    let formatted = paragraphs.join("\n\n").trim()
    if (!formatted.endsWith(".")) formatted += "."

    await sock.sendMessage(msg.from, { text: formatted }, { quoted: msg })


    await sock.sendMessage(msg.from, {
      react: { text: "✅", key: msg.key }
    })
  } catch (e) {
    console.error(`❌ Error Perplexity:`, e)
    await sock.sendMessage(msg.from, { text: "⚠️ Error saat menghubungi API" }, { quoted: msg })
  }
}