const axios = require("axios");

module.exports = {
 config: {
 name: "tempmail1",
 aliases: ["tm1"],
 version: "1.0",
 author: "kylepogi",
 countDown: 5,
 role: 0,
 shortDescription: "Get Temporary Email Addresses",
 longDescription: "This command allows you to fetch multiple temporary email addresses, which can be useful for various online activities.",
 category: "utility",
 guide: {
 en: "To use this command, simply send it as a message. For example: {p}{n}",
 }
 },

 onStart: async function ({ api, event, args }) {
 try {
 // Make a GET request to the provided API
 const response = await axios.get("https://api.samirthakuri.repl.co/1secmail/get");

 // Log the entire API response for debugging
 console.log("API Response:", response.data);

 // Extract and display the temporary email addresses
 let emailAddresses = '';
 for (let i = 1; i <= 6; i++) {
 const emailKey = `email${i}`;
 if (response.data[emailKey]) {
 emailAddresses += `${response.data[emailKey]}\n`;
 }
 }

 if (emailAddresses) {
 api.sendMessage(`Temporary Email Addresses:\n${emailAddresses}`, event.threadID);
 } else {
 api.sendMessage("No temporary email addresses found in the response.", event.threadID);
 }
 } catch (error) {
 // Handle any errors that might occur during the API request
 console.error("Error fetching temporary email addresses:", error);
 api.sendMessage("Error fetching temporary email addresses.", event.threadID);
 }
 }
};
