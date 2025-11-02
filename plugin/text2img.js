module.exports = async function(sock, msg, args) {
    try {
        const text = args.join(" "); 

        if (!text) {
            return sock.sendMessage(
                msg.key.remoteJid,
                { text: "❌ Mohon masukkan prompt, contoh: .text2img Mobil Lamborghini" },
                { quoted: msg }
            );
        }

        await sock.sendMessage(msg.key.remoteJid, { react: { text: "🎨", key: msg.key } });

        const api = `https://api.sxtream.xyz/ai/texttoimg?text=${encodeURIComponent(text)}`;
        const res = await fetch(api);
        if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);

        const data = await res.json();
        const imageUrl = data.data.url;

        await sock.sendMessage(
            msg.key.remoteJid,
            { image: { url: imageUrl }, caption: `🖼️ Prompt: ${text}` },
            { quoted: msg }
        );

        await sock.sendMessage(msg.key.remoteJid, { react: { text: "✅", key: msg.key } });

    } catch (e) {
        console.error("[Text2Img Plugin Error]", e);
        await sock.sendMessage(
            msg.key.remoteJid,
            { text: "❌ Gagal membuat gambar!" },
            { quoted: msg }
        );
        await sock.sendMessage(msg.key.remoteJid, { react: { text: "❌", key: msg.key } });
    }
};