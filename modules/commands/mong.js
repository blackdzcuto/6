module.exports.config = {
	name:"mong",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "",
	description: "Random ảnh ghệ đic pư",
	commandCategory: "media",
	cooldowns: 3
};
module.exports.run = async ({ api, event,}) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	axios.get('https://Ryanair-Web-Api-Phan-Duy.truccuche27042004.repl.co/api/gaiditbu.php').then(res => {
	let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
	let callback = function () {
					api.sendMessage({
                                                body: `Ghệ đit bự`,
						attachment: fs.createReadStream(__dirname + `/cache/gaiditbu.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/gaiditbu.${ext}`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/gaiditbu.${ext}`)).on("close", callback);
			})
}