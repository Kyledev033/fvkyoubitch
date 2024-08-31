const axios = require('axios');
const moment = require('moment-timezone');

module.exports = {
    config: {
        name: "prefix",
        version: "1.0",
        author: "Tokodori_Frtiz",
        countDown: 5,
        role: 0,
        shortDescription: "no prefix",
        longDescription: "no prefix",
        category: "auto 🪐",
    },
    onStart: async function() {},
    onChat: async function({ event, message, getLang }) {
        const manilaTime = moment.tz('Asia/Manila');
        const formattedDateTime = manilaTime.format('MMMM D, YYYY h:mm A');
        
        if (event.body && event.body.toLowerCase() === "prefix") {
            const randomFact = minecraftFacts[Math.floor(Math.random() * minecraftFacts.length)];
            const attachment = await global.utils.getStreamFromURL("https://i.imgur.com/BaLvXkm.jpeg");
            
            // Fetch random pickup lines
            let pickupline = "No pickup lines available.";
            try {
                const response = await axios.get("https://api.popcat.xyz/pickuplines/?passage=random&type=json");
                if (response.status === 200 && response.data && response.data.length > 0) {
                    pickupline = response.data[0];
                }
            } catch (error) {
                console.error("Error fetching pickup lines:", error);
            }

            return message.reply({
                body: `
 [𓃵]—𝗭𝗘𝗣𝗛𝗬𝗥𝗨𝗦 𝗣𝗥𝗘𝗙𝗜𝗫 𝗜𝗦:
       ➣ 𝗕𝗼𝘁 𝗽𝗿𝗲𝗳𝗶𝘅: 『 . 』 ࿇══━━━━✥◈✥━━━━══ ࿇
    📅 | ⏰ Date And Time: 
     ${formattedDateTime} ࿇══━━━━✥◈✥━━━━══ ࿇
📍𝗥𝗔𝗡𝗗𝗢𝗠 𝗣𝗜𝗖𝗞𝗨𝗣𝗟𝗜𝗡𝗘𝗦:  ${pickupline}`,
                attachment: attachment
            });
        }
    }
};
