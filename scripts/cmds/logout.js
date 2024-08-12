module.exports = {
  config: {
    name: "logout",
    version: "1.0",
    author: "Samir",
    countDown: 45,
    role: 0,
    shortDescription: "Logout Bot's Account",
    longDescription: "Logout Bot's Account",
    category: "owner",
    guide: "{p}{n}"
  },
  onStart: async function({ event, api }) {
  const permission = ["100052395031835"];
  if (!permission.includes(event.senderID)) {
    api.sendMessage("You don't have enough permission to use this command. Only Samuel Kâñèñgeè can do it.", event.threadID, event.messageID);
    return;
  }
  api.sendMessage("𝗭𝗲𝗽𝗵 𝗕𝗼𝘁𝘃𝟮 𝗶𝘀 𝗹𝗼𝗴𝗴𝗶𝗻𝗴 𝗼𝘂𝘁 𝗻𝗼𝘄...", event.threadID, event.messageID);
  api.logout();
}
};
