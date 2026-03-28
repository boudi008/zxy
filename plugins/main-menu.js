const config = require('../config');
const moment = require('moment-timezone');
const { cmd, commands } = require('../command');

function toSmallCaps(str) {
  const smallCaps = {
    A: 'ᴀ', B: 'ʙ', C: 'ᴄ', D: 'ᴅ', E: 'ᴇ', F: 'ғ', G: 'ɢ', H: 'ʜ',
    I: 'ɪ', J: 'ᴊ', K: 'ᴋ', L: 'ʟ', M: 'ᴍ', N: 'ɴ', O: 'ᴏ', P: 'ᴘ',
    Q: 'ǫ', R: 'ʀ', S: 's', T: 'ᴛ', U: 'ᴜ', V: 'ᴠ', W: 'ᴡ', X: 'x',
    Y: 'ʏ', Z: 'ᴢ'
  };
  return str.toUpperCase().split('').map(c => smallCaps[c] || c).join('');
}

cmd({
  pattern: "menu",
  alias: ["mega", "allmenu"],
  use: '.menu',
  desc: "Show all bot commands",
  category: "menu",
  react: "❄️",
  filename: __filename
},
async (conn, mek, m, { from, reply }) => {
  try {
    const totalCommands = commands.length;

    const uptime = () => {
      let sec = process.uptime();
      let h = Math.floor(sec / 3600);
      let min = Math.floor((sec % 3600) / 60);
      let s = Math.floor(sec % 60);
      return `${h}h ${min}m ${s}s`;
    };

    let category = {};
    for (let c of commands) {
      if (!c.category) continue;
      if (!category[c.category]) category[c.category] = [];
      category[c.category].push(c);
    }

    let menuText = `╭----------------------------
│♲ 𝙱𝙾𝚃 𝙽𝙰𝙼𝙴 : 𝙼𝙴𝙶𝙰𝙻𝙾𝙳𝙾𝙽 𝙼𝙳
│♲ 𝚄𝚂𝙴𝚁 : @${m.sender.split("@")[0]}
│♲ 𝙿𝚁𝙴𝙵𝙸𝚇 : 『 ${config.PREFIX} 』
│♲ 𝚅𝙴𝚁𝚂𝙸𝙾𝙽 : \`2.0.0\`
│♲ 𝙼𝙾𝙳𝙴 : ${config.MODE}
│♲ 𝚄𝙿𝚃𝙸𝙼𝙴 : ${uptime()}
│♲ 𝙿𝙻𝚄𝙶𝙸𝙽𝚂 : ${totalCommands}
│♲ 𝙳𝙴𝚅 : \`𝙳𝙴𝚅 𝙳𝚈𝙱𝚈 𝚃𝙴𝙲𝙷\`
╰----------------------------\n`;

    const keys = Object.keys(category).sort();
    for (let k of keys) {
      menuText += `\n⃠${k.toUpperCase()} 𝙼𝙴𝙽𝚄 ⃠\n`;
      menuText += `╭-------------------------\n`;
      const cmds = category[k]
        .filter(c => c.pattern)
        .sort((a, b) => a.pattern.localeCompare(b.pattern));
      cmds.forEach(c => {
        const usage = c.pattern.split('|')[0];
        menuText += `├➩ ${toSmallCaps(usage)}\n`;
      });
      menuText += `╰-------------------------\n`;
    }

    menuText += `\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴇᴠ ᴅʏʙʏ`;

    await conn.sendMessage(from, {
      image: { url: config.MENU_IMAGE_URL },
      caption: menuText,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363406273402002@newsletter',
          newsletterName: '𝐌𝐄𝐆𝐀𝐋𝐎𝐃𝐎𝐍-𝐌𝐃',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});
