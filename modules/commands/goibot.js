module.exports.config={name:"goibot",version:"1.0.0",hasPermssion:2,credits:"ManhG",description:"Gọi Bot No reply",commandCategory:"Other",usages:"",cooldowns:2,denpendencies:{}},module.exports.handleEvent=async({event:e,api:o,Users:t,Threads:a})=>{var{threadID:n,messageID:s,body:i,senderID:d}=e;const r=global.data.threadData.get(n)||{};if(void 0!==r.goibot&&0==r.goibot)return;if(d==global.data.botID)return;let g=await t.getNameUser(e.senderID),c=(await a.getData(e.threadID)).threadInfo;var h=e.threadID,l=["hmmmm", "Đừng spam em nha :<<", "Đừng để em nóng!!!", "cậu gọi bot có gì không?", "mệt kêu hoài -.-", "Chăm chỉ học hành đi", "Bae ăn cơm chưa?", "Tuyển phi công nè ạ", "Nếu cậu đang cô đơn thì chúng ta có thể thành đôi :3", "Đang làm gì vậy?", "Được của ló :)))", "Làm chồng em không ạ?", "đi ga chỗ khác chơi", "Công chúa em sao đấy?", "Có gì ăn không:(( đói quáaa", "Yêu em không?", "cậu bị làm sao í@@", "Bạn là nhất!!!", "Kêu chi lắm thế? Bộ thích tao rồi à :v", "Chần chờ gì chồng ơi em đâyyy", "Em... Sao em lại nói những cái lời đó chi zay em?", "Thầy dạy phờ ri màaa", "Yeu em rat nhieu ^^", "Đồ con lợn lùn :))", "Đợi xí. Đi ẻ cái :()", "500k bao phòng!!!", "Yeu anh den luy ^^", "Nên nhớ đừng bao giờ cướp ghệ của admin :))", "Anh quát em à?\nNói to thế á?", "Trả quần cho em huhu", "Baby, take my hand. I want you to be my husband. Cause you're my Iron Man. And I love you 3000 <3", "Tao cười tao đi toilet=))", "Hãy nên nhớ, cuộc tình nào cũng có lúc tàn phai", "hoa hồng nở rộ 4 mùa...nối tiếp đi:)", "lalalalaaaa", "Đừng quá yêu một ai đó, khi chính bản thân bạn vẫn bị tổn thương!", "Bae, em nhu bong hoa. Nhung nguoi hai dau phai ta 💔", "Nuôi cậu để thịt ~~", "Overnight không?", "Hãy gọi cho admin tôi để được yêu thương<3", "Hát đi cho kẹo 🍭", "vợ gọi có việc gì không?", "Dzạaaaaa~~~", "gọi bot có gì hemm :3", "Dzạ em đây :>", "sao thế bae yêu dấu :>", "Sao thế công chúa", "Được của ló :)))", "Nếu một ngày nào đó bạn gọi tôi mà tôi không trả lời nghĩa là bot bị payyy acccc ;-;", "Em đây", "chào bạn tôi là bot của Des", "Vợ gọi có việc gì không?", "Sử dụng •callad để liên lạc với admin!", "Em đây~~~~", "Yêu anh Des nhất", "chị ấy là bae của Des", "Sao thế công chúa nhõng nhẽo của em", "Đừng làm em đau ~~~~", "Tuyển máy bay trực thăng nè ai yêu em hog", "Cậu có cô đơn ko để mik tâm sự", "Yêu ko ạ vã quá!!!", "bot dthw như chủ của bot ạ", "Đừng khen anh ngại quá hí hí" ,"Làm vợ anh ko ạ?", "Đừng spam anh nha :<<, cậu chủ anh mệt lắm ời", "Cút ra😏 tớ có vợ rồi😏🖕", "Ai Làm Vợ Em Hog?", "Alaba Trap", "không được spam bot nhé các bae", "Yêu anh ko?", "Vợ anh đây rồi", "chủ tớ là thứ hai hong ai là nhất", "làm Vợ em đuy😏", "Chủ Em Đẹp Zai Khoai To Lắm UwU", "Yêu Tất Cả Mụi Người:3", "Tuyển Ghệ nè các bbi😏🖕y ạ :3",`${g}, sử dụng callad để liên lạc với admin!`,`${g}, gọi em có việc gì thế`,`${g}, yêu em ko mà gọi😢`,`${g}, tôi yêu bạn vl ❤`,`${g}, yêu nhau không?`,`${g}, bạn có yêu tôi không ❤`,`${g}, dạ có em đây:3`,`${g}, yêu admin bot đi rồi hãy gọi`,`${g}, yêu em ❤`,`${g}, [Góc Donate] Bạn có thể donate cho tôi chứ?`,`${g}, Tao đây, cút ra chỗ khác?, Gọi cái địt con bà mày`],u=l[Math.floor(Math.random()*l.length)];["bot","bot ơi","bot oi","yêu bot","bot đâu"].forEach((e=>{let t=e[0].toUpperCase()+e.slice(1);if(i===e.toUpperCase()|i===e|t===i){let t=c.threadName;return modules="------ Gọi bot ------\n",console.log(modules,e+"|",t,h),a=u,void o.sendMessage(a,n,s)}var a}))},module.exports.languages={vi:{on:"Bật",off:"Tắt",successText:"goibot thành công"},en:{on:"on",off:"off",successText:"goibot success!"}},module.exports.run=async function({api:e,event:o,Threads:t,getText:a}){const{threadID:n,messageID:s}=o;let i=(await t.getData(n)).data;return void 0===i.goibot||1==i.goibot?i.goibot=!1:i.goibot=!0,await t.setData(n,{data:i}),global.data.threadData.set(n,i),e.sendMessage(`${0==i.goibot?a("off"):a("on")} ${a("successText")}`,n,s)};