const moment = require('moment-timezone');
const axios = require('axios');
const cron = require('node-cron'); // Added require for cron

module.exports.config = {
  name: "autopickuplines",
  version: "3.0.0",
  role: 0,
  author: "Kylepogi", // lol don't change the author if you change it i will hack your Facebook account👿
  description: "",
  category: "Autopickuplines",
  countDown: 50
};

module.exports.onLoad = async ({ api, getLang, utils }) => {
  const getBibleVerse = async () => {
    try {
      const response = await axios.get("https://api.popcat.xyz/pickuplines/?passage=random&type=json");

      if (response.status === 200 && response.data.length > 0) {
        const verse = response.data[0];
        return `🤙 𝚁𝙰𝙽𝙳𝙾𝙼 𝙿𝙸𝙲𝙺𝚄𝙿𝙻𝙸𝙽𝙴𝚂:\n\n${pickupline}`;
      } else {
        return "Sorry, an error occurred while getting the pickuplines.";
      }
    } catch (error) {
      return "Sorry, an error occurred while getting the pickuplines.";
    }
  };

  cron.schedule('0 */12 * * * *', async function() { // Fixed syntax error here
    const now = moment().tz('Asia/Manila');
    const currentTime = now.format('HH:mm:ss'); // 24-hour format for consistency

    // Get the Bible verse message
    const message = await getBibleVerse();

    // Get all thread IDs
    const threadIDs = global.db.allThreadData.map(i => i.threadID);
    threadIDs.forEach(threadID => {
      api.sendMessage(message, threadID);
    });
  });
};

module.exports.onStart = () => {
  console.log(`${module.exports.config.name} module started!`);
};
