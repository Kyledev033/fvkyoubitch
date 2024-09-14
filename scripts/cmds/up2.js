module.exports = {
	config: {
		name: "uptime2",
		aliases: ["up2"],
		role: 0,
		shortDescription: {
			en: "Show server uptime",
			tl: "Ipakita ang uptime ng server",
		},
		longDescription: {
			en: "Shows the duration for which the server has been running",
			tl: "Ipapakita ang tagal na gumagana ang server",
		},
		category: "goatBot",
		guide: {
			en: "{p}uptime",
			tl: "{p}uptime",
		},
	},

	onStart: async function ({ api, message, threadsData }) {
		const os = require("os");
		const uptime = os.uptime();

		const days = Math.floor(uptime / (3600 * 24));
		const hours = Math.floor((uptime % (3600 * 24)) / 3600);
		const mins = Math.floor((uptime % 3600) / 60);
		const seconds = Math.floor(uptime % 60);

		const system = `𝗢𝘀: ${os.platform()} ${os.release()}`;
		const cores = `𝗖𝗼𝗿𝗲𝘀: ${os.cpus().length}`;
		const arch = `𝗔𝗿𝗰𝗵𝗶𝘁𝗲𝗰𝘁𝘂𝗿𝗲: ${os.arch()}`;
		const totalMemory = `𝗧𝗼𝘁𝗮𝗹 𝗠𝗲𝗺𝗼𝗿𝘆: ${Math.round(os.totalmem() / (1024 * 1024 * 1024))} GB`;
		const freeMemory = `𝗙𝗿𝗲𝗲 𝗠𝗲𝗺𝗼𝗿𝘆: ${Math.round(os.freemem() / (1024 * 1024 * 1024))} GB`;
		const uptimeString = `𝘂𝗽𝘁𝗶𝗺𝗲: ${days} 𝗱𝗮𝘆𝘀, ${hours} 𝗵𝗼𝘂𝗿𝘀, ${mins} 𝗺𝗶𝗻𝘂𝘁𝗲𝘀, 𝗮𝗻𝗱  ${seconds} 𝘀𝗲𝗰𝗼𝗻𝗱𝘀`;

		const response = `🕒⧽⧽『${uptimeString}』⧼⧼\n━━━━━━━━━━━━━\n\n╰╾➤📡 ${system}\n╰╾➤🛡 ${cores}\n╰╾➤⚔ 𝖻𝗈𝗍 𝗈𝗇𝗅𝗂𝗇𝖾🟢\n╰╾➤📈 Total Users: ${threadsData.size}\n╰╾➤📉 Total Threads: ${threadsData.size}\n⚖ AI Usage: 0.0\n╰╾➤📊 RAM Usage: ${Math.round(process.memoryUsage().rss / (1024 * 1024))} MB\n╰╾➤💽 𝗧𝗼𝘁𝗮𝗹(𝗥𝗔𝗠): ${Math.round(os.totalmem() / (1024 * 1024 * 1024))} GB\n╰╾➤💾 𝗖𝘂𝗿𝗿𝗲𝗻𝘁(𝗥𝗔𝗠): ${Math.round(os.freemem() / (1024 * 1024 * 1024))} GB\n╰╾➤🛫 𝗣𝗶𝗻𝗴: 15 ms\n╰╾➤⏰ 𝗨𝗽𝘁𝗶𝗺𝗲(𝗦𝗲𝗰𝗼𝗻𝗱𝘀): ${Math.floor(process.uptime())}\n━━━━━━━━━━━━━\n📩𝗔𝗗𝗠𝗜𝗡 𝗖𝗢𝗡𝗧𝗔𝗖𝗧:https://www.facebook.com/profile.php?id=100052395031835`;

		message.reply(response);
	},
};
