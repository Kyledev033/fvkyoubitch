const moment = require('moment-timezone');
const axios = require('axios');
const cron = require('node-cron');

module.exports.config = {
  name: "autopickuplines",
  version: "3.0.0",
  role: 0,
  author: "Kylepogi",
  description: "",
  category: "autopickuplines",
  countDown: 50
};

module.exports.onLoad = async ({ api, getLang, utils }) => {
  const getPickUpLine = async () => {
    try {
      const response = await axios.get("https://api.popcat.xyz/pickuplines");

      if (response.status === 200 && response.data.length > 0) {
        const pickupline = response.data[0]; // Fix variable name
        return `🔔 𝙰𝚞𝚝𝚘 𝚙𝚒𝚌𝚔𝚞𝚙𝚕𝚒𝚗𝚎𝚜:\n\n━━━━━━━━━━━━━━━\n🤍 | ${pickupline}\n━━━━━━━━━━━━━━━`;
      } else {
        return "Sorry, an error occurred while getting the autopickuplines.";
      }
    } catch (error) {
      return "Sorry, an error occurred while getting the autopickuplines.";
    }
  };

  cron.schedule('0 */7 * * *', async function() { // Fixed cron expression syntax
    const now = moment().tz('Asia/Manila');
    const currentTime = now.format('HH:mm:ss');

    const message = await getPickUpLine(); // Corrected function call

    const threadIDs = global.db.allThreadData.map(i => i.threadID);
    threadIDs.forEach(threadID => {
      api.sendMessage(message, threadID);
    });
  });
};

module.exports.onStart = () => {
  console.log(`${module.exports.config.name} module started!`);
};
