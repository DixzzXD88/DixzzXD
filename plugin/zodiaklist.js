module.exports = async function (sock, msg) {
    try {
        const list = [
            "♈ Aries (21 Mar - 19 Apr)",
            "♉ Taurus (20 Apr - 20 Mei)",
            "♊ Gemini (21 Mei - 20 Jun)",
            "♋ Cancer (21 Jun - 22 Jul)",
            "♌ Leo (23 Jul - 22 Agu)",
            "♍ Virgo (23 Agu - 22 Sep)",
            "♎ Libra (23 Sep - 22 Okt)",
            "♏ Scorpio (23 Okt - 21 Nov)",
            "♐ Sagittarius (22 Nov - 21 Des)",
            "♑ Capricorn (22 Des - 19 Jan)",
            "♒ Aquarius (20 Jan - 18 Feb)",
            "♓ Pisces (19 Feb - 20 Mar)"
        ];

        const teks = `📜 *Daftar Zodiak*\n\n` + list.join("\n");

        await sock.sendMessage(msg.from, { text: teks }, { quoted: msg });

    } catch (err) {
        console.error("❌ Error di plugin zodiaklist:", err);
        await sock.sendMessage(msg.from, { 
            text: "⚠️ Terjadi kesalahan saat menampilkan daftar zodiak." 
        }, { quoted: msg });
    }
};