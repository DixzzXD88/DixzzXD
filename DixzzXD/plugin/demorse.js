// plugin/demorse.js
module.exports = async function (sock, m, args) {
    try {
        const reverseMorseDict = {
            '•–': 'a', '–•••': 'b', '–•–•': 'c', '–••': 'd', '•': 'e',
            '••–•': 'f', '––•': 'g', '••••': 'h', '••': 'i', '•–––': 'j',
            '–•–': 'k', '•–••': 'l', '––': 'm', '–•': 'n', '–––': 'o',
            '•––•': 'p', '––•–': 'q', '•–•': 'r', '•••': 's', '–': 't',
            '••–': 'u', '•••–': 'v', '•––': 'w', '–••–': 'x', '–•––': 'y',
            '––••': 'z', '•––––': '1', '••–––': '2', '•••––': '3', '••••–': '4',
            '•••••': '5', '–••••': '6', '––•••': '7', '–––••': '8', '––––•': '9',
            '–––––': '0'
        };

        const inputText = args.join(' ');
        if (!inputText) {
            return sock.sendMessage(m.key.remoteJid, { text: `❌ Masukkan kode morse!\n\nContoh:\n.demorse •– / –•••` }, { quoted: m });
        }

        // Ganti "_" dengan "-"
        const cleanInput = inputText.replace(/_/g, "–");

        // Pisahkan kata dengan "/"
        const words = cleanInput.split("/").map(w => w.trim());

        const result = words.map(word => {
            return word.split(" ").map(char => reverseMorseDict[char] || "").join("");
        }).join(" ");

        await sock.sendMessage(m.key.remoteJid, { text: result }, { quoted: m });

    } catch (e) {
        await sock.sendMessage(m.key.remoteJid, { text: '❌ Terjadi kesalahan dalam decode morse' }, { quoted: m });
    }
};

module.exports.help = ['demorse'];
module.exports.tags = ['tools', 'fun'];
module.exports.command = /^demorse$/i;