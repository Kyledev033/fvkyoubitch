const axios = require('axios');
const moment = require('moment-timezone');
const NodeCache = require('node-cache');
const Tesseract = require('tesseract.js'); // Import Tesseract.js

// Initialize cache
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

// Add more APIs or AI services here.
const services = [
    { url: 'http://markdevs-last-api.onrender.com/api/v2/gpt4', param: 'query' },
    { url: 'https://markdevs-last-api.onrender.com/api/v3/gpt4', param: 'ask' },
    { url: 'https://markdevs-last-api.onrender.com/gpt4', param: 'prompt', uid: 'uid' },
    { url: 'https://gemini-ai-pearl-two.vercel.app/kshitiz', param: 'prompt', uid: 'uid', extra: { apikey: 'kshitiz' } },
    { url: 'https://sandipbaruwal.onrender.com/gemini2', param: 'prompt' }
];

const designatedHeader = "𝗭𝗘𝗣𝗛𝗬𝗥𝗨𝗦 𝗔𝗜";

// Function to extract text from image
const extractTextFromImage = async (imagePath) => {
    const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');
    return text.trim();
};

const getAIResponse = async (question, messageID) => {
    // Check if response is cached
    const cachedResponse = cache.get(question);
    if (cachedResponse) {
        return { response: cachedResponse, messageID };
    }

    const response = await getAnswerFromAI(question.trim() || "hi");
    // Cache the response
    cache.set(question, response);
    return { response, messageID };
};

const handleCommand = async (api, event, args, message, usersData) => {
    const name = await usersData.getName(event.senderID);
    try {
        const question = args.join(" ").trim();
        if (!question) return message.reply("𝗞𝗬𝗟𝗘'𝗦(𝗔.𝗜) 𝗡𝗢𝗧𝗜𝗙\n\nℹ️ Please provide a question to get an answer.");
        const { response, messageID } = await getAIResponse(question, event.messageID);
        api.sendMessage(`✅ 𝘼𝙉𝙎𝙒𝙀𝙍: ${response}\n\n🗣 Asked by: ${name}\n📆|⏰𝗥𝗲𝘀𝗽𝗼𝗻𝗱 𝗗𝗮𝘁𝗲&𝗧𝗶𝗺𝗲:\n${moment.tz("Asia/Manila").format("DD/MM/YYYY, h:mm:ss A")}`, event.threadID, messageID);
    } catch (error) {
        console.error("Error in handleCommand:", error.message);
        message.reply("An error occurred while processing your request.");
    }
};

const onChat = async ({ event, api, usersData }) => {
    const name = await usersData.getName(event.senderID);
    const messageContent = event.body.trim().toLowerCase();
    
    // Check if the message contains an image
    if (event.attachments && event.attachments.length > 0) {
        const imageUrl = event.attachments[0].url; // Get the first image URL
        const extractedText = await extractTextFromImage(imageUrl);
        
        // Process the extracted text as a question
        const { response, messageID } = await getAIResponse(extractedText, event.messageID);
        api.sendMessage(`✅ 𝘼𝙉𝙎𝙒𝙀𝙍: ${response}\n🗣 Asked by: ${name}\n📆|⏰𝗥𝗲𝘀𝗽𝗼𝗻𝗱 𝗗𝗮𝘁𝗲&𝗧𝗶𝗺𝗲:\n${moment.tz("Asia/Manila").format("DD/MM/YYYY, h:mm:ss A")}`, event.threadID, messageID);
        return;
    }
    
    // Existing message handling...
};

module.exports = {
    config: {
        name: 'ai',
        author: 'coffee modified by kyle',
        role: 0,
        category: 'ai',
        shortDescription: 'AI to answer any question',
    },
    onStart,
    onChat,
    handleCommand
};
