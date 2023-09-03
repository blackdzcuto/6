module.exports.config = {
	name: "banbaucua",
	version: "1.1.4",
	hasPermssion: 0,
	credits: "DungUwU",
	description: "baucua nhiều người có thể chơi cùng",
	commandCategory: "Games",
	usages: "[create/leave/start]\n[nai/bầu/gà/tôm/cua/cá]",
	dependencies: {
		"fs": "",
		"axios": ""
	},
	cooldowns: 3
};

module.exports.languages = {
	"vi": {
        "missingInput": "💵 Số ti��n đặt cược không được để trống hoặc là số âm",
        "wrongInput": "💵 Bạn chưa nhập số tiền ?",
        "moneyBetNotEnough": "💵 Bạn không đủ tiền trong ví!",
        "limitBet": "💵 Số tiền bạn đặt phải trên 100.Vnđ",
        "alreadyHave": "⚡ Box của bạn đã có bàn bầu cua!",
        "alreadyBet": "⚡ Bạn đã cược vào đây từ trước!",
        "createSuccess": "[ BÀN BẦU CUA ] Tạo thành công.\n~bbaucua nai Or gà... + Số tiền cược.\nCó thể đặt nhiều con cùng một lúc!",
        "noGame": "[ BÀN BẦU CUA ] Box của bạn không có bàn bầu cua nào đang diễn ra cả!",
        "betSuccess": "💵 Đặt thành công %1.Vnđ vào %2",
        "notJoined": "⚡ Bạn chưa tham gia bầu cua ở box này!",
        "outSuccess": "⚡ Đã rời bàn bầu cua thành công, bạn sẽ được hoàn tiền!",
        "shaking": "🌸 Đang lắc...",
        "final": " ===⟩⟩ KẾT QUẢ ⟨⟨===",
        "notAuthor": "⚡ Bạn không phải chủ phòng.",
        "unknown": "=====🦌 Bàn Bầu Cua 🐓=====\n\n🍐 ~bbaucua create ≻ Để tạo bàn.\n🦀 ~bbaucua nai Or gà... + Số tiền cược ≻ Để tham gia bàn.\n🦞 ~bbaucua start ≻ Để bắt đầu.\n🐟 ~bbaucua leave ≻ Để rời khỏi bàn.",
        "noPlayer": "⚡ Hiện không có người đặt cược",
        "closed": "⚡ Đã đóng bàn bầu cua!"
	}
}

module.exports.onLoad = async () => {
	const fs = require("fs");
	await require('axios').get("https://raw.githubusercontent.com/RFS-ADRENO/mirai-modules/main/version.json").then(res => {
		if (res.data["baucua_x022"] != this.config.version) console.log("-BAUCUA ĐÃ CÓ PHIÊN BẢN MỚI, LIÊN HỆ DungUwU ĐỂ ĐƯỢC CẬP NHẬT-");
	})
	let path = __dirname + '/baucua/';
	if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
	await require("axios").get("https://raw.githubusercontent.com/RFS-ADRENO/base64_baucua/main/data_baucua.json").then(async (res) => {
		for (let e in res.data) {
			if (fs.existsSync(path + e)) continue;
			await fs.writeFileSync(path + e, res.data[e], 'base64');
		}
	});
	if (!global.client.baucua) global.client.baucua = {};
	console.log("-----BAUCUA LOADED SUCCESSFULLY------");
};


module.exports.run = async function({ api, event, args, getText, Users, Currencies }) {
	if (!global.client.baucua) global.client.baucua = {};
	const { senderID, messageID, threadID } = event;
	const { increaseMoney, decreaseMoney, getData } = Currencies;
    const moneyUser = (await getData(senderID)).money;
	const sendC = (msg, callback) => api.sendMessage(msg, threadID, callback, messageID);
	const sendTC = (msg, callback) => api.sendMessage(msg, threadID, callback);
	const sendT = (msg) => sendTC(msg, () => {});
	const send = (msg) => sendC(msg, () => {});
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
	switch(args[0]) {
		case "create": {
			if (threadID in global.client.baucua) send(getText("alreadyHave"));
			else sendTC(getText("createSuccess", prefix, this.config.name), () => {
				global.client.baucua[threadID] = {
					players: 0,
					data: {},
					status: "pending",
					author: senderID
				};
			});
			return;
		};
		case "leave": {
			if (!global.client.baucua[threadID]) return send(getText("noGame"));
			if (!global.client.baucua[threadID].data[senderID]) return send(getText("notJoined"));
			else {
				global.client.baucua[threadID].players--;
				global.client.baucua[threadID].data[senderID].forEach(async (e) => {
					await increaseMoney(senderID, e.bet);
				})
				delete global.client.baucua[threadID].data[senderID];
				send(getText("outSuccess"));
			}
			return;
		};
		case "start": {
			if (!global.client.baucua[threadID]) return send(getText("noGame"));
			if (global.client.baucua[threadID].author != senderID) return send(getText("notAuthor"));
			if (global.client.baucua[threadID].players == 0) return send(getText("noPlayer"));
			sendTC(getText("shaking"), (err, info) => setTimeout(() => api.unsendMessage(info.messageID), 3000));
			await new Promise(resolve => setTimeout(resolve, 3000));
			let sixC = ["nai","bầu","gà","tôm","cua","cá"];
			let sixE = ["🦌","🍐","🐓","🦐","🦀","🐟"];
			let _1st = Math.floor(Math.random() * 6);
			let _2nd = Math.floor(Math.random() * 6);
			let _3rd = Math.floor(Math.random() * 6);
			let ketqua = [sixC[_1st], sixC[_2nd], sixC[_3rd]];
			let name = "", win = 0, lose = 0;
			let bcatm = [];
			for (e of ketqua) {
				let imgStream = require("fs").createReadStream(__dirname + `/baucua/${e}.jpg`);
				bcatm.push(imgStream);
			}
			let msg = "";
			for (i in global.client.baucua[threadID].data) {
				name = await Users.getNameUser(i) || "Player";
				msg += `\n${name}: `;
				global.client.baucua[threadID].data[i].forEach(async (e) => {
					if (!ketqua.includes(e.name)) lose += e.bet;
					else {
						let count = 1;
						ketqua.forEach(t => {
							if (t == e.name) count++;
						})
						win += e.bet*(count-1);
						await increaseMoney(i, e.bet*count);
					}
				});
				msg += (win - lose >= 0) ? " +" : " ";
				msg += `${win - lose}$`;
				win = 0, lose = 0;
			}
			sendTC({
				body: getText("final"),
				attachment: bcatm
			}, () => sendTC(msg, () => delete global.client.baucua[threadID]));
			return;
		};
		case "end": {
			if (!global.client.baucua[threadID]) return send(getText("noGame"));
			if (global.client.baucua[threadID].author != senderID) return send(getText("notAuthor"));
			sendTC(getText("closed"), () => delete global.client.baucua[threadID]);
		}
		default: {
			if (!["nai","bầu","bau","gà","ga","tôm","tom","cua","cá","ca"].includes(args[0])) return send(getText("unknown", prefix, this.config.name));
			if (!global.client.baucua[threadID]) return send(getText("noGame"));
			if (args.length < 2) return send(getText("wrongInput"));
			moneyBet = parseInt(args[1]);
		    if (isNaN(moneyBet) || moneyBet <= 0) return send(getText("missingInput"));
			if (moneyBet > moneyUser) return send(getText("moneyBetNotEnough"));
			if (moneyBet < 100) return send(getText("limitBet"));
			if (threadID in global.client.baucua) {
				if (global.client.baucua[threadID].status == "pending") {
					let luachon = args[0].toLowerCase();
					if (!["nai","bầu","bau","gà","ga","tôm","tom","cua","cá","ca"].includes(luachon)) return send(getText("wrongInput"));
					if (["bầu","bau"].includes(luachon)) luachon = "bầu";
					if (["gà","ga"].includes(luachon)) luachon = "gà";
					if (["tôm","tom"].includes(luachon)) luachon = "tôm";
					if (["cá","ca"].includes(luachon)) luachon = "cá";
					if (!global.client.baucua[threadID].data[senderID]) {
						global.client.baucua[threadID].players++;
						global.client.baucua[threadID].data[senderID] = [];
					};
					if (global.client.baucua[threadID].data[senderID] && global.client.baucua[threadID].data[senderID].find(e => e.name == luachon)) return send(getText("alreadyBet"));
					sendC(getText("betSuccess", moneyBet, luachon), () => {
						decreaseMoney(senderID, moneyBet);
						global.client.baucua[threadID].data[senderID].push({
							name: luachon,
							bet: moneyBet
						})
					});
				}
			}
			return;
		}
	}
}
