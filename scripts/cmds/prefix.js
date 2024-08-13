const fs = require("fs-extra");
const { utils } = global;

module.exports = {
  config: {
    name: "prefix",
    alias: ["p"], 
    version: "1.3",
    author: "NTKhang",
    countDown: 5,
    role: 0,
    shortDescription: "see the bot's prefix",
    longDescription: "Change the bot's command symbol in your chat box or the entire bot system (admin only)",
    category: "members",
    guide: {
      en: `
        {pn} <new prefix>: change new prefix in your box chat
        Example:
         {pn} #
         
        {pn} <new prefix> -g: change new prefix in system bot (only admin bot)
        Example:
         {pn} # -g
         
        {pn} reset: change prefix in your box chat to default
      `
    }
  },

  langs: {
    en: {
      reset: "Your prefix has been reset to default: %1",
      onlyAdmin: "Only admin can change prefix of system bot",
      confirmGlobal: "Please react to this message to confirm change prefix of system bot",
      confirmThisThread: "Please react to this message to confirm change prefix in your box chat",
      successGlobal: "Changed prefix of system bot to: %1",
      successThisThread: "Changed prefix in your box chat to: %1",
      myPrefix: `╭┈◈➣ 𝗭𝗘𝗣𝗛 𝗣𝗥𝗘𝗙𝗜𝗫: [ %2 ]𓃵
╰┈➤ 𝗧𝘆𝗽𝗲 %2help or help(withoutprefix)𝗍𝗈 𝗏𝗂𝖾𝗂𝗇 𝖺𝗅𝗅 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌.
╰┈➤ 𝗧𝘆𝗽𝗲 %2help (𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗇𝖺𝗆𝖾𝗌) 𝗍𝗈 𝗏𝗂𝖾𝗂𝗇 𝗍𝗁𝖾𝗂𝗋 𝖽𝖾𝗌𝖼𝗋𝗂𝗉𝗍𝗂𝗈𝗇.`,
      loading: "🤖 | 𝗭𝗘𝗣𝗛 𝗕𝗢𝗧𝗩𝟮 𓃵|\n━━━━━━━━━━━━━━━\n⏳ | 𝙋𝙡𝙚𝙖𝙨𝙚 𝙬𝙖𝙞𝙩......\n━━━━━━━━━━━━━━━\n",
    }
  },

  onStart: async function ({ message, role, args, commandName, event, threadsData, getLang }) {
    if (!args[0]) return message.SyntaxError();

    if (args[0] === 'reset') {
      await threadsData.set(event.threadID, null, "data.prefix");
      return message.reply(getLang("reset", global.GoatBot.config.prefix));
    }

    const newPrefix = args[0];
    const formSet = {
      commandName,
      author: event.senderID,
      newPrefix,
      setGlobal: args[1] === "-g"
    };

    if (formSet.setGlobal && role < 2) {
      return message.reply(getLang("onlyAdmin"));
    }

    return message.reply(
      formSet.setGlobal ? getLang("confirmGlobal") : getLang("confirmThisThread"),
      (err, info) => {
        if (err) return message.reply("An error occurred while sending the confirmation message.");
        formSet.messageID = info.messageID;
        global.GoatBot.onReaction.set(info.messageID, formSet);
      }
    );
  },

  onReaction: async function ({ message, threadsData, event, Reaction, getLang }) {
    const { author, newPrefix, setGlobal } = Reaction;
    if (event.userID !== author) return;

    if (setGlobal) {
      global.GoatBot.config.prefix = newPrefix;
      fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
      return message.reply(getLang("successGlobal", newPrefix));
    } else {
      await threadsData.set(event.threadID, newPrefix, "data.prefix");
      return message.reply(getLang("successThisThread", newPrefix));
    }
  },

  onChat: async function ({ event, message, getLang }) {
    if (event.body && (event.body.toLowerCase() === "prefix" || event.body.toLowerCase() === "p")) {
      return message.reply(getLang("myPrefix", global.GoatBot.config.prefix, utils.getPrefix(event.threadID)));
    }
  }
};
