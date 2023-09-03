module.exports.config = {
  name: "console",
  version: "1.0.0",
  hasPermssion: 3,
  credits: "ManhG", //random mau + fix vặt + cus by RIINIKY
  description: "Bật tắt console",
  commandCategory: "admin",
  depndencies: { "chalk": "" },
  usages: "[on/off]",
  cooldowns: 2
};

module.exports.handleEvent = async ({ event, api, Users, Threads }) => {

let random1 = Math.floor(Math.random() * 255) + 100;
let random2 = Math.floor(Math.random() * 255) + 100;
let random3 = Math.floor(Math.random() * 255) + 100;
let random4 = Math.floor(Math.random() * 255) + 100;
let random5 = Math.floor(Math.random() * 255) + 100;
let random6 = Math.floor(Math.random() * 255) + 100;
let random7 = Math.floor(Math.random() * 255) + 100;
let random8 = Math.floor(Math.random() * 255) + 100;
let random9 = Math.floor(Math.random() * 255) + 100;
let random10 = Math.floor(Math.random() * 255) + 100;
let random11 = Math.floor(Math.random() * 255) + 100;
let random12 = Math.floor(Math.random() * 255) + 100;
let random13 = Math.floor(Math.random() * 255) + 100;
let random14 = Math.floor(Math.random() * 255) + 100;
let random15 = Math.floor(Math.random() * 255) + 100;
let random16 = Math.floor(Math.random() * 255) + 100;
let random17 = Math.floor(Math.random() * 255) + 100;
let random18 = Math.floor(Math.random() * 255) + 100;


  const moment = require("moment-timezone");
  
   
  const chalk = global.nodemodule["chalk"];
  const thread = global.data.threadData.get(event.threadID) || {};
  if (typeof thread["console"] !== "undefined" && thread["console"] == true) return;
  if (event.senderID == global.data.botID) return;
    var nameUser = await Users.getNameUser(event.senderID);
    var datathread = (await Threads.getData(event.threadID)).threadInfo;
    var namethread = datathread.threadName;  

    var names = chalk.rgb(random1, random2, random3)(nameUser);
    var thread1 = chalk.rgb(random4, random5, random6)(namethread);
    var gio = chalk.rgb(random13, random14, random15)(moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss"));
    var body = chalk.rgb(random16, random17, random18)(event.body || "Admin NGUYỄN LÝ HẢI <3");
    var red = chalk.rgb(random7, random8, random9)(" | ");
    var cach = "\n[🌟]──────────────────────────────────────[🌟]"
    console.log(chalk.rgb(random10, random11, random12)() + gio + red + thread1 + red + names + red + body + cach)
};

module.exports.languages = {
  "vi": {
    "on": "Bật",
    "off": "Tắt",
    "successText": "console thành công",
  },
  "en": {
    "on": "on",
    "off": "off",
    "successText": "console success!",
  }
}

module.exports.run = async function ({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;

  if (typeof data["console"] == "undefined" || data["console"] == true) data["console"] = false;
  else data["console"] = true;

  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["console"] == false) ? getText("on") : getText("off")} ${getText("successText")}`, threadID, messageID);
}