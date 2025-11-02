const morseDict = {
  'a': '•–', 'b': '–•••', 'c': '–•–•', 'd': '–••', 'e': '•',
  'f': '••–•', 'g': '––•', 'h': '••••', 'i': '••', 'j': '•–––',
  'k': '–•–', 'l': '•–••', 'm': '––', 'n': '–•', 'o': '–––',
  'p': '•––•', 'q': '––•–', 'r': '•–•', 's': '•••', 't': '–',
  'u': '••–', 'v': '•••–', 'w': '•––', 'x': '–••–', 'y': '–•––',
  'z': '––••', '1': '•––––', '2': '••–––', '3': '•••––', '4': '••••–',
  '5': '•••••', '6': '–••••', '7': '––•••', '8': '–––••', '9': '––––•',
  '0': '–––––', ' ': '/'
};

function textToMorse(text) {
  return text
    .toLowerCase()
    .split('')
    .map(char => morseDict[char] || char)
    .join(' ');
}

module.exports = async function (sock, m, args) {
  try {
    const text = args.join(' ');
    if (!text) {
      return sock.sendMessage(m.key.remoteJid, {
        text: `❌ Masukkan teks yang mau diubah ke Morse!\n\nContoh:\n.morse halo dunia`
      }, { quoted: m });
    }

    // React menunggu
    await sock.sendMessage(m.key.remoteJid, { react: { text: "🕐", key: m.key } });

    const result = textToMorse(text);

    await sock.sendMessage(m.key.remoteJid, {
      text: `👉 *${text}*\n\n📡 Morse:\n\`\`\`${result}\`\`\``
    }, { quoted: m });

    // React berhasil
    await sock.sendMessage(m.key.remoteJid, { react: { text: "✅", key: m.key } });

  } catch (e) {
    console.error(e);

    // React gagal
    await sock.sendMessage(m.key.remoteJid, { react: { text: "❌", key: m.key } });

    sock.sendMessage(m.key.remoteJid, { text: "❌ Terjadi kesalahan!" }, { quoted: m });
  }
};