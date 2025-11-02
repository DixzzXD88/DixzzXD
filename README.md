# 💫 DixzzXD Bot

> Bot WhatsApp berbasis **Baileys** yang ringan, simple, dan bisa dikembangkan dengan sistem **plugin otomatis reload**.  
> Sekarang juga bisa dihubungkan ke **Telegram**: [@yajujmanuk](https://t.me/yajujmanuk)

---

## ⚙️ Fitur Utama
- 🔁 Auto reload plugin (gak perlu restart bot tiap ubah file)
- 💬 Prefix command: `.` (contoh: `.menu`, `.p`)
- 🧩 Sistem plugin modular (tinggal tambah file baru di folder `plugin`)
- 🧠 Struktur sederhana, cocok buat recode atau belajar
- ⚡ Fast & stable (pakai Baileys v6)

---

## 🚀 Cara Install
```bash
# Clone repository
git clone https://github.com/DixzzXD88/DixzzXD.git
cd DixzzXD

# Install dependency
yarn install
# atau kalau pakai npm
npm install


---

▶️ Cara Menjalankan Bot

# Jalankan bot
yarn start
# atau
npm start

Saat pertama kali dijalankan, bot akan menampilkan QR Code untuk login WhatsApp.
Scan QR itu pakai WhatsApp kamu (fitur WhatsApp Web).

📸 Contoh tampilan di terminal:

🔑 Scan QR ini di WhatsApp Web:
█████████████████████████████
████ ▄▄▄▄▄ ██▀▄▀█ ▄▄▄▄▄ ████
████ █   █ █▀ ▀▄█ █   █ ████
████ █▄▄▄█ █ ▀ ▀█ █▄▄▄█ ████
████▄▄▄▄▄▄▄█▄█▄█▄▄▄▄▄▄▄█████
✅ DixzzXD berhasil konek ke WhatsApp!


---

🧩 Contoh Plugin .p

📄 plugin/p.js

module.exports = async (sock, msg, args) => {
  const replies = [
    "Oi 👊",
    "Yo bro 😎",
    "Ada apa nih?",
    "Siap gas 💪",
    "Hadir boss 🔥",
    "Weh, dipanggil nih 😏"
  ];
  const randomReply = replies[Math.floor(Math.random() * replies.length)];
  await sock.sendMessage(msg.from, { text: randomReply });
};

💬 Cara pakai:
Ketik di chat WhatsApp:

.p


---

🧰 Struktur Folder

DixzzXD/
├── index.js         # File utama bot
├── package.json     # Info dan dependency
├── plugin/          # Folder semua command/plugin
│   ├── menu.js
│   └── p.js
└── session/         # Data login WhatsApp


---

👑 Owner & Kontak

Telegram: @yajujmanuk

GitHub: DixzzXD88
