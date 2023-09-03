module.exports.config = {
    name: "pending",
    version: "1.0.2",
    credits: "CatalizCS (Khánh Fix)",
    hasPermssion: 3,
    description: "Quản lý tin nhắn chờ của bot",
    commandCategory: "Admin",
    usages: "",
    cooldowns: 5
}, module.exports.handleReply = async function({
    api: n,
    event: e,
    handleReply: t
}) {
    if (t.author == e.senderID) {
        var s = "",
            a = e.body.split(" ").map(n => parseInt(n));
        for (let e of a) n.changeNickname("[ " + global.config.PREFIX + " ] • " + (global.config.BOTNAME ? global.config.BOTNAME : "BotMilo <3"), t.listid[e - 1], n.getCurrentUserID()), n.sendMessage("Kết nối thành công vui lòng sử dụng " + global.config.PREFIX + "help để xem toàn bộ lệnh của bot <3", t.listid[e - 1]), s += "ID : " + t.listid[e - 1] + "\n😶\n";
        return n.unsendMessage(t.messageID), n.sendMessage("Đã duyệt thành công người dùng || nhóm :\n\n" + s, e.threadID, (e, t) => setTimeout(() => {
            n.unsendMessage(t.messageID)
        }, 1e4))
    }
}, module.exports.run = async function({
    api: n,
    event: e
}) {
    try {
        var t = await n.getThreadList(100, null, ["OTHER"]),
            s = await n.getThreadList(100, null, ["PENDING"])
    } catch (n) {
        console.log(n)
    }
    let a = [...t, ...s].filter(n => 1 == n.isSubscribed);
    var o = "",
        i = 1,
        g = [];
    for (groupInfo of a) o += i++ + ". Tên : " + groupInfo.name + "\nID : " + groupInfo.threadID + "\n", g.push(groupInfo.threadID);
    "" == o ? n.sendMessage("✅Hiện tại không có người dùng || nhóm nào cần duyệt !", e.threadID, e.messageID) : n.sendMessage("❎Đang có tổng: " + a.length + ". người dùng || nhóm đang trong tin nhắn chờ cần bạn duyệt\n\n" + o + "\nHãy replay tin nhắn theo số thứ tự bên dưới để duyệt!", e.threadID, (n, t) => {
        global.client.handleReply.push({
            name: this.config.name,
            messageID: t.messageID,
            author: e.senderID,
            listid: g
        })
    })
};
