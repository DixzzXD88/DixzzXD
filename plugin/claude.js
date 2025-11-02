const axios = require("axios")
const { JSDOM } = require("jsdom")
const FormData = require("form-data")

module.exports = async function (sock, msg, args, { isOwner }) {
  const text = args.join(" ")
  if (!text) {
    return sock.sendMessage(msg.from, {
      text: `Format salah!\n\nContoh penggunaan:\n.claude Siapa penemu gravitasi?`
    })
  }

  try {

    await sock.sendMessage(msg.from, {
      react: { text: "🔍", key: msg.key }
    })

    const headers = {
      Accept: "*/*",
      Referer: "https://claudeai.one/",
      Origin: "https://claudeai.one",
    }

    const { data: html } = await axios.get("https://claudeai.one/", { headers })
    const dom = new JSDOM(html)
    const doc = dom.window.document

    const nonce = doc.querySelector("[data-nonce]")?.getAttribute("data-nonce") || ""
    const postId = doc.querySelector("[data-post-id]")?.getAttribute("data-post-id") || ""
    const botId = doc.querySelector("[data-bot-id]")?.getAttribute("data-bot-id") || ""

    const match = html.match(/localStorage\.setItem\(['"]wpaicg_chat_client_id['"],\s*['"](.+?)['"]\)/)
    const clientId = match ? match[1] : "JHFiony-" + Math.random().toString(36).substring(2, 12)

    const form = new FormData()
    form.append("_wpnonce", nonce)
    form.append("post_id", postId)
    form.append("url", "https://claudeai.one")
    form.append("action", "wpaicg_chat_shortcode_message")
    form.append("message", text)
    form.append("bot_id", botId)
    form.append("chatbot_identity", "shortcode")
    form.append("wpaicg_chat_history", "[]")
    form.append("wpaicg_chat_client_id", clientId)

    const { data } = await axios.post(
      "https://claudeai.one/wp-admin/admin-ajax.php",
      form,
      { headers: { ...headers, ...form.getHeaders() } }
    )

    let jawaban = data?.data || "❌ Gagal mendapatkan balasan dari Claude."

    jawaban = jawaban
      .replace(/[*_`#~>-]/g, "")
      .replace(/[\u200B-\u200D\uFEFF]/g, "")
      .replace(/\s+/g, " ")
      .trim()

    // Paragraf tiap 2 kalimat
    let sentences = jawaban.split(/(?<=\.)\s+/)
    let paragraphs = []
    for (let i = 0; i < sentences.length; i += 2) {
      paragraphs.push(sentences.slice(i, i + 2).join(" "))
    }

    let formatted = paragraphs.join("\n\n").trim()
    if (!formatted.endsWith(".")) formatted += "."

    await sock.sendMessage(msg.from, { text: formatted }, { quoted: msg })

    // === Kasih reaction ✅ setelah selesai ===
    await sock.sendMessage(msg.from, {
      react: { text: "✅", key: msg.key }
    })
  } catch (e) {
    console.error("❌ Error Claude:", e)
    const err = e.response?.data || e.message
    await sock.sendMessage(msg.from, { text: "⚠️ Terjadi error:\n" + JSON.stringify(err, null, 2) }, { quoted: msg })
  }
}