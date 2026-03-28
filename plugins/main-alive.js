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
    const totalCommands = commands.length;
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

    const buttons = [
      {
        name: "cta_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "📂 ᴍᴇɴᴜ",
          id: `${prefix}menu`
        })
      },
      {
        name: "cta_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "👑 ᴏᴡɴᴇʀ",
          id: `${prefix}owner`
        })
      }
    ];

    await conn.sendMessage(from, {
      image: { url: config.MENU_IMAGE_URL },
      caption,
      footer: "© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴇᴠ ᴅʏʙʏ",
      interactiveButtons: buttons,
      viewOnce: true
    }, { quoted: mek });

  } catch (err) {
    console.error(err);
    reply("❌ An error occurred while processing your request.");
  }
});
