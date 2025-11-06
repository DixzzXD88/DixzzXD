const moment = require("moment-timezone")
require("moment/locale/id")
moment.locale("id")

module.exports = async (sock, msg, args, { isOwner }) => {
  try {
    const sender = msg.pushName || "User"
    const nomor = msg.key.remoteJid
      ? msg.key.remoteJid.split("@")[0]
      : "Tidak diketahui"

    await sock.sendMessage(msg.from, {
      react: { text: "âœ¨", key: msg.key }
    })

    const tanggal = moment().tz("Asia/Jakarta").format("dddd, DD MMMM YYYY")
    const jam = moment().tz("Asia/Jakarta").hour()
    let emojiWaktu = "ðŸ•’"
    if (jam >= 5 && jam < 11) emojiWaktu = "ðŸŒ…"
    else if (jam >= 11 && jam < 15) emojiWaktu = "â˜€ï¸"
    else if (jam >= 15 && jam < 18) emojiWaktu = "ðŸŒ‡"
    else if (jam >= 18 && jam < 22) emojiWaktu = "ðŸŒŒ"

    const waktu = moment().tz("Asia/Jakarta").format("HH:mm") + " " + emojiWaktu

    const teks = `
=======ã€Ž Info Bot ã€=======

ã„” Nama: ${sender}
ã„” Nomor: ${nomor}

ã„” Halo kak: ${sender}
ã„” Tanggal: ${tanggal}
ã„” Waktu: ${waktu}

ã„” Nama Bot: DixzzXD
ã„” Language : JavaScript
ã„” Type : Plugin
ã„” Developer : Dixzz

â•”â”€â”€ã€Ž Random ã€
â”‚ãƒ„ .tiktok
â”‚ãƒ„ .tiktokslide (tahap pengembangan )
â”‚ãƒ„ .ytmp3 (tahap pengembangan)
â”‚ãƒ„ .ytmp4 (tahap pengembangan)
â”‚ãƒ„ .instagram (tahap pengembangan)
â”‚ãƒ„ .spotify (tahap pengembangan)
â”‚ãƒ„ .videy (tahap pengembangan)
â•šâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â˜‰
`

    await sock.sendMessage(
      msg.from,
      {
        image: { url: "https://files.catbox.moe/1fsgrj.jpg" },
        caption: teks
      },
      { quoted: msg }
    )

    await sock.sendMessage(msg.from, {
      react: { text: "âœ…", key: msg.key }
    })
  } catch (err) {
    console.error("Error di plugin randommenu:", err)
    await sock.sendMessage(
      msg.from,
      { text: "âŒ Terjadi error di plugin randommenu" },
      { quoted: msg }
    )
  }

}
