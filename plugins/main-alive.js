const config = require("../config");
const prefix = config.PREFIX;
const os = require("os");
const { cmd, commands } = require("../command");
const { runtime } = require("../lib/functions");

cmd({
  pattern: "alive",
  alias: ["test"],
  desc: "Show styled alive menu",
  category: "main",
  use: ".alive",
  react: "👋",
  filename: __filename
}, async (conn, mek, m, { from, pushname, reply }) => {
  try {

    const totalCommands = Array.isArray(commands) ? commands.length : 0;
    const uptime = runtime(process.uptime());
    const ramUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const ramTotal = Math.round(os.totalmem() / 1024 / 1024);

    const caption = `╭-------------------------
┆→ *ᴄʀᴇᴀᴛᴏʀ* : *ᴅʏʙʏ ᴛᴇᴄʜ*
┆→ *ᴍᴏᴅᴇ* : *${config.MODE}*
┆→ *ᴘʀᴇғɪx* : *${prefix}*
┆→ *ᴏᴡɴᴇʀ ɴᴀᴍᴇ* : ${config.OWNER_NAME}
┆→ *ᴠᴇʀsɪᴏɴ* : *2.0.0*
┆→ *ᴜᴘᴛɪᴍᴇ* : ${uptime}
┆→ *ʀᴀᴍ* : ${ramUsed} MB / ${ramTotal} MB
┆→ *ᴄᴏᴍᴍᴀɴᴅs* : ${totalCommands}
╰-------------------------`;

    // 🔘 Bouton principal + ton bouton script
    const buttons = [
      {
        buttonId: `${prefix}menu`,
        buttonText: { displayText: " ᴍᴇɴᴜ" },
        type: 1
      },
      {
        buttonId: `${prefix}owner`,
        buttonText: { displayText: "ᴏᴡɴᴇʀ" },
        type: 1
      },
      {
        buttonId: `${prefix}repo`,
        buttonText: { displayText: "𝐕𝐈𝐄𝐖 𝐒𝐂𝐑𝐈𝐏𝐓" },
        type: 1
      }
    ];

    // 🔥 Flow (list button moderne)
    const flowActions = [
      {
        buttonId: 'action',
        buttonText: { displayText: 'Tʜɪs ʙᴜᴛᴛᴏɴ ʟɪsᴛ' },
        type: 4,
        nativeFlowInfo: {
          name: 'single_select',
          paramsJson: JSON.stringify({
            title: "𝐌𝐄𝐍𝐔",
            sections: [
              {
                title: "ᴘʟᴇᴀsᴇ ᴄʜᴏsᴇ ᴏɴᴇ",
                rows: [
                  { title: "𝐀𝐋𝐋 𝐌𝐄𝐍𝐔", description: "𝐋𝐈𝐒𝐓 𝐌𝐄𝐍𝐔", id: ".menu" },
                  { title: "𝐁𝐔𝐆 𝐌𝐄𝐍𝐔", description: "𝐁𝐔𝐆 𝐌𝐄𝐍𝐔", id: ".bugmenu" }
                ]
              }
            ]
          })
        }
      }
    ];

    // ➕ Fusion des boutons
    buttons.push(...flowActions);

    await conn.sendMessage(from, {
      image: { url: config.MENU_IMAGE_URL },
      caption: caption,
      footer: "> © 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝙳𝙴𝚅 𝙳𝚈𝙱𝚈",
      buttons: buttons,
      headerType: 4,
      mentions: [m.sender],
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "1@",
          newsletterName: " UPDATE "
        }
      },
      viewOnce: true
    }, { quoted: mek });

  } catch (err) {
    console.error(err);
    reply("❌ An error occurred while processing your request.");
  }
});
